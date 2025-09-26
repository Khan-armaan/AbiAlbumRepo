import { Request, Response } from "express";
import asyncHandler from "../utils/AsynHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import prisma from "../db";
import z from "zod";
import bcrypt from "bcryptjs";


import { generateAccessToken, generateRefreshToken } from "../services/generateTokens";


const CreateUserSchema = z.object({
    name: z.string().min(2).max(100).trim(),
    email: z.string().email().trim(),
    phone: z.string().min(10).max(15),
    password: z.string().min(6).max(100).refine(val => 
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(val), {
            message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        }
    ),
    profileImage: z.string().url().optional(),
    about: z.string().max(500).optional()
});

const updateUserSchema = z.object({
    name: z.string().min(2).max(100).trim().optional(),
    email: z.string().email().trim().optional(),
    phone: z.string().min(10).max(15).optional(),
    password: z.string().min(6).max(100).optional(),
    profileImage: z.string().url().optional(),
    about: z.string().max(500).optional()
  
});

const LoginUserSchema = z.object({
    email: z.string().email().optional(),
    phone: z.string().min(10).max(15).optional(),
    password: z.string().min(6).max(100)
});



//funciton to hash password
const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

// funciton to compare password 
const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
}



/**
 * @desc Create/Signup a new user
 * @route POST /api/users/signup
 * @access Public
 */
export const createUser = asyncHandler(async (req: Request, res: Response) => {
    // Validate request body using Zod schema
    const validatedData = CreateUserSchema.safeParse(req.body);

    if (!validatedData.success) {
        throw new ApiError(400, "Validation failed", validatedData.error.issues);
    }
        // Check if either email or phone is provided
    if (!validatedData.data.email && !validatedData.data.phone) {
        throw new ApiError(400, "Either email or phone is required for signup");
    }
 

    const userExists = await prisma.user.findFirst({
        where: {
            OR: [
                { email: validatedData.data.email || undefined },
                { phone: validatedData.data.phone || undefined }
            ]
        }
    });
    
    if (userExists) {
        throw new ApiError(400, "User with this email or phone already exists");
    }

    // Hash the password before storing
    const hashedPassword = await hashPassword(validatedData.data.password);

    const user = await prisma.user.create({
        data: {
            name: validatedData.data.name ,
            email: validatedData.data.email,
            phone: validatedData.data.phone,
            password: hashedPassword,
            profileImage: validatedData.data.profileImage || null,
            about: validatedData.data.about
          },
         
    });
     const refreshToken = await generateRefreshToken(user.id);


        await prisma.user.update({
                    where: { id: user.id },
                    data: { refreshToken: refreshToken }
                });
    console.log("User created:", user);

    // Generate tokens
    const accessToken = await generateAccessToken(user.id);
   

 
    return res.status(201).json(
        new ApiResponse(
            201,
            {
                refreshToken,
                accessToken,
                name : user.name,
                email : user.email,
                phone : user.phone,
               
            },
            "User created successfully"
        )
    );
});


// Controller to handle user login
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    // Validate request body using Zod schema
    const validatedData = LoginUserSchema.safeParse(req.body);

    if (!validatedData.success) {
        throw new ApiError(400, "Validation failed", validatedData.error.issues);
    }

    // Check if either email or phone is provided
    if (!validatedData.data.email && !validatedData.data.phone) {
        throw new ApiError(400, "Either email or phone is required for login");
    }

    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { email: validatedData.data.email || undefined },
                { phone: validatedData.data.phone || undefined }
            ],
        
        }
    });
    console.log(user)

       // Check if user exists and password matches
        if (!user || !(await comparePassword(validatedData.data.password, user.password))) {
            return res.status(401).json(new ApiError(401, "Invalid credentials"));
        }
    if (!user) {
        throw new ApiError(401, "Invalid credentials");
    }
// direct compare
// if (validatedData.data.password !== user.password) {
//     throw new ApiError(401, "Invalid credentials");
// }


// //compare hashed
// if (!(await comparePassword(validatedData.data.password, user.password))) {
//         throw new ApiError(401, "Invalid credentials");
//     }

    // Generate tokens
    const accessToken = await generateAccessToken(user.id);
    const refreshToken = await generateRefreshToken(user.id);
    await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: refreshToken }
    });


    return res.status(200).json(
        new ApiResponse(
            200,
            {
                refreshToken,
                accessToken,
                name : user.name,
                email : user.email,
                phone : user.phone,
           
            },
            "Login successful"
        )
    );
});


// controller to update  the user deatils 
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    // Validate request body using Zod schema
    const validatedData = updateUserSchema.safeParse(req.body);

    if (!validatedData.success) {
        throw new ApiError(400, "Validation failed", validatedData.error.issues);
    }
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized");
    }

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            email: validatedData.data.email,
            phone: validatedData.data.phone,
            name: validatedData.data.name,
            profileImage: validatedData.data.profileImage,
            about: validatedData.data.about
         
        }
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                user: updatedUser
            },
            "User updated successfully"
        )
    );
});



// controller to get the user profile 
export const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized");
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
           name: true,
           email: true,
              phone: true,
              profileImage: true,
              about: true
        
        }
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                user
            },
            "User profile retrieved successfully"
        )
    );
});


//controller to delete user
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    
    if (!userId) {
        throw new ApiError(401, "Unauthorized");
    }
    await prisma.user.delete({
        where: { id: userId }
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "User deleted successfully"
        )
    );
});

// controller to get all users (for admin purposes)
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            profileImage: true,
            about: true,
            createdAt: true
        }
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                users
            },
            "All users retrieved successfully"
        )
    );
});


//controller for the signout user
export const signOutUser = asyncHandler(async (req: Request, res: Response) => {
   
    const userId = req.user?.id;
    
    if (!userId) {
        throw new ApiError(401, "Unauthorized");
    }
    await prisma.user.update({
        where: { id: userId },
        data: { refreshToken: null }
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "User signed out successfully"
        )
    );
}); 