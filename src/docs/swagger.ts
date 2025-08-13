import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerOptions } from "swagger-ui-express";
import path from "path";

const port = process.env.PORT || 3000;
const host = process.env.HOST || `localhost:${port}`;

const options: SwaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MySagra API Documentation',
            description: "Hello World!",
            version: '1.0.0',
        },

        servers: [
            {
                url: `http://localhost:${port}/v1`,
                description: 'Development server V1'
            },
            {
                url: `https://${host}/v1`,
                description: 'Production server V1'
            }
        ],
        tags: [
            {
                name: 'Auth',
                description: 'Authentication and authorization'
            },
            {
                name: 'Users',
                description: 'User management'
            },
            {
                name: 'Roles',
                description: 'Role management'
            },
            {
                name: 'Categories',
                description: 'Category management'
            },
            {
                name: 'Foods',
                description: 'Food management'
            },
            {
                name: 'Orders',
                description: 'Order management'
            },
            {
                name: 'Stats',
                description: 'Order stats'
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    // Corretti i percorsi per puntare ai file compilati
    apis: [
        path.join(__dirname, '../routes/**/*.ts'), // Percorso assoluto ai file compilati
        path.join(__dirname, '../controllers/**/*.ts'), // Se hai documentazione nei controller
    ]
}

export const swaggerSpec = swaggerJSDoc(options);