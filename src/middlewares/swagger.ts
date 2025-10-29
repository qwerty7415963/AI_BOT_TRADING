import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Express OOP API',
    version: '1.0.0',
  },
  paths: {
    '/hello': {
      get: {
        summary: 'Say Hello',
        responses: {
          '200': {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export function setupSwagger(app: Application) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
