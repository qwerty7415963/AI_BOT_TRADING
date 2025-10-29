import cors from 'cors';
import helmet from 'helmet';
import { Application } from 'express';

export function applySecurityMiddleware(app: Application) {
  app.use(cors());
  app.use(helmet());
}
