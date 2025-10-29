import { Router } from 'express';
import fs from 'fs';
import path from 'path';

export interface RouteDefinition {
  method: 'get' | 'post' | 'put' | 'delete';
  path: string;
  handler: (...args: any[]) => any;
}

export class MainRouter {
  public router: Router;
  private controllers: Record<string, any> = {};
  private routes: RouteDefinition[] = [];

  constructor() {
    this.router = Router();
    this.loadControllers();
    this.loadRoutes();
    this.initializeRoutes();
  }

  private loadControllers() {
    const controllersPath = path.join(__dirname, '../controllers');
    fs.readdirSync(controllersPath).forEach(file => {
      if (file.endsWith('.ts') || file.endsWith('.js')) {
        const controllerName = file.replace(/\.(ts|js)$/, '');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const ControllerClass = require(path.join(controllersPath, file))[controllerName];
        if (ControllerClass) {
          this.controllers[controllerName] = new ControllerClass();
        }
      }
    });
  }

  private loadRoutes() {
    // Example: auto add /hello route if HelloController has sayHello method
    Object.keys(this.controllers).forEach(ctrlName => {
      const ctrl = this.controllers[ctrlName];
      if (typeof ctrl.sayHello === 'function') {
        this.routes.push({
          method: 'get',
          path: '/hello',
          handler: (req, res) => ctrl.sayHello(req, res)
        });
      }
      // Add more auto route logic here if needed
    });
  }

  private initializeRoutes() {
    this.routes.forEach(route => {
      this.router[route.method](route.path, route.handler);
    });
  }
}
