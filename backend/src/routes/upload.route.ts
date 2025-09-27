
import { ApiResponse } from "../utils/ApiResponse";
import express, { Request, Response } from 'express';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import multer from 'multer';



const router = express.Router(); 
const upload = multer();

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  }
});


/**
 * @swagger
 * /api/v1/upload:
 *   post:
 *     summary: Upload file to S3
 *     description: Upload a file (images, videos, PDF files, documents) to AWS S3 bucket. Supported formats - Images (JPEG, PNG, GIF, WebP, SVG), Videos (MP4, AVI, MOV, WMV, FLV, WebM), PDF files, and documents (DOC, DOCX, XLS, XLSX, TXT, CSV)
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File to upload (images, videos, PDF files, or documents)
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       description: URL of the uploaded file
 *                 message:
 *                   type: string
 *                   example: File uploaded successfully
 *       400:
 *         description: No file uploaded or invalid file type (only images, videos, PDF files, and documents are allowed)
 *       500:
 *         description: Server error
 */
router.post('/',  upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json(
        new ApiResponse(400, null, 'No file uploaded')
      );
    }

    const file = req.file;
    
    // Validate file type - allow images, videos, PDFs, and other documents
    const allowedMimeTypes = [
      // Image types
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      // Video types
      'video/mp4',
      'video/avi',
      'video/quicktime',
      'video/x-msvideo',
      'video/x-flv',
      'video/webm',
      'video/x-ms-wmv',
   
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return res.status(400).json(
        new ApiResponse(400, null, 'Invalid file type. Allowed types: images (JPEG, PNG, GIF, WebP, SVG), videos (MP4, AVI, MOV, WMV, FLV, WebM)')
      );
    }

    // Create unique filename
    const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;

    // Set up S3 upload command
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME || '',
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    // Upload to S3
    await s3Client.send(command);

    // Generate the URL for the uploaded file
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    // Return success response
    return res.status(200).json(
      new ApiResponse(200, { url: fileUrl }, 'File uploaded successfully')
    );
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json(
      new ApiResponse(500, null, 'Failed to upload file')
    );
  }
});

export const uploadRouter = router; 