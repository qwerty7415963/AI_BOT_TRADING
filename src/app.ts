import express from 'express';
import { MainRouter } from './routes/MainRouter';
import { config } from './config';
import { logger } from './middlewares/logger';
import { applySecurityMiddleware } from './middlewares/security';
import { setupSwagger } from './middlewares/swagger';
import { errorHandler } from './middlewares/errorHandler';

class ExpressApp {
  public app: express.Application;
  private port: number | string;

  constructor() {
    this.app = express();
    this.port = config.port;
    this.config();
    this.applyMiddlewares();
    this.applyRoutes();
    this.applySwagger();
    this.applyErrorHandler();
  }

  private config() {
    this.app.use(express.json());
  }

  private applyMiddlewares() {
    this.app.use(logger);
    applySecurityMiddleware(this.app);
    // Tự động load các middleware khác nếu cần
  }

  private applyRoutes() {
    this.app.use('/', new MainRouter().router);
  }

  private applySwagger() {
    setupSwagger(this.app);
  }

  private applyErrorHandler() {
    this.app.use(errorHandler);
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

const server = new ExpressApp();
server.start();
