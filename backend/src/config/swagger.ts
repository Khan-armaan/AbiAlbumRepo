import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: process.env.API_TITLE || 'Album API',
      version: process.env.API_VERSION || '1.0.0',
      description: process.env.API_DESCRIPTION || 'Comprehensive Album Management API with user authentication and management features',
      contact: {
        name: process.env.API_CONTACT_NAME || 'API Support',
        email: process.env.API_CONTACT_EMAIL || 'support@albumapi.com'
      }
    },
    tags: [
      {
        name: 'Users',
        description: 'User authentication and management endpoints'
      }
    ],
    servers: [
      {
        url: process.env.SERVER_URL || process.env.LOCAL_BACKEND_URI || 'http://localhost:3000',
        description: process.env.SERVER_DESCRIPTION || 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        CreateUser: {
          type: 'object',
          required: ['name', 'password'],
          properties: {
            name: {
              type: 'string',
              minLength: 2,
              maxLength: 100,
              example: 'John Doe'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john.doe@example.com'
            },
            phone: {
              type: 'string',
              minLength: 10,
              maxLength: 15,
              example: '+1234567890'
            },
            password: {
              type: 'string',
              minLength: 6,
              maxLength: 100,
              pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$',
              example: 'Password123!',
              description: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            },
            profileImage: {
              type: 'string',
              format: 'url',
              example: 'https://example.com/profile.jpg'
            },
            about: {
              type: 'string',
              maxLength: 500,
              example: 'Software developer with 5 years of experience'
            }
          }
        },
        LoginUser: {
          type: 'object',
          required: ['password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'john.doe@example.com'
            },
            phone: {
              type: 'string',
              minLength: 10,
              maxLength: 15,
              example: '+1234567890'
            },
            password: {
              type: 'string',
              minLength: 6,
              maxLength: 100,
              example: 'Password123!'
            }
          },
          description: 'Either email or phone is required along with password'
        },
        UpdateUser: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              minLength: 2,
              maxLength: 100,
              example: 'John Doe Updated'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john.updated@example.com'
            },
            phone: {
              type: 'string',
              minLength: 10,
              maxLength: 15,
              example: '+1234567891'
            },
            profileImage: {
              type: 'string',
              format: 'url',
              example: 'https://example.com/new-profile.jpg'
            },
            about: {
              type: 'string',
              maxLength: 500,
              example: 'Updated bio information'
            }
          }
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'clxxxxxxxxxxxxx'
            },
            name: {
              type: 'string',
              example: 'John Doe'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john.doe@example.com'
            },
            phone: {
              type: 'string',
              example: '+1234567890'
            },
            profileImage: {
              type: 'string',
              format: 'url',
              nullable: true,
              example: 'https://example.com/profile.jpg'
            },
            about: {
              type: 'string',
              nullable: true,
              example: 'Software developer'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-01-01T00:00:00.000Z'
            }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            statusCode: {
              type: 'integer',
              example: 201
            },
            data: {
              type: 'object',
              properties: {
                refreshToken: {
                  type: 'string',
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                },
                accessToken: {
                  type: 'string',
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                },
                name: {
                  type: 'string',
                  example: 'John Doe'
                },
                email: {
                  type: 'string',
                  example: 'john.doe@example.com'
                },
                phone: {
                  type: 'string',
                  example: '+1234567890'
                }
              }
            },
            message: {
              type: 'string',
              example: 'User created successfully'
            },
            success: {
              type: 'boolean',
              example: true
            }
          }
        },
        UserProfileResponse: {
          type: 'object',
          properties: {
            statusCode: {
              type: 'integer',
              example: 200
            },
            data: {
              type: 'object',
              properties: {
                user: {
                  $ref: '#/components/schemas/User'
                }
              }
            },
            message: {
              type: 'string',
              example: 'User profile retrieved successfully'
            },
            success: {
              type: 'boolean',
              example: true
            }
          }
        },
        UpdateUserResponse: {
          type: 'object',
          properties: {
            statusCode: {
              type: 'integer',
              example: 200
            },
            data: {
              type: 'object',
              properties: {
                user: {
                  $ref: '#/components/schemas/User'
                }
              }
            },
            message: {
              type: 'string',
              example: 'User updated successfully'
            },
            success: {
              type: 'boolean',
              example: true
            }
          }
        },
        AllUsersResponse: {
          type: 'object',
          properties: {
            statusCode: {
              type: 'integer',
              example: 200
            },
            data: {
              type: 'object',
              properties: {
                users: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/User'
                  }
                }
              }
            },
            message: {
              type: 'string',
              example: 'All users retrieved successfully'
            },
            success: {
              type: 'boolean',
              example: true
            }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            statusCode: {
              type: 'integer',
              example: 200
            },
            data: {
              type: 'object',
              nullable: true,
              example: null
            },
            message: {
              type: 'string',
              example: 'Operation completed successfully'
            },
            success: {
              type: 'boolean',
              example: true
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            statusCode: {
              type: 'integer',
              example: 400
            },
            message: {
              type: 'string',
              example: 'Error message'
            },
            success: {
              type: 'boolean',
              example: false
            },
            errors: {
              type: 'array',
              items: {
                type: 'object'
              },
              example: []
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/index.ts', './src/routes/*.ts'] // Update paths as needed
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;