import { Request, Response, NextFunction } from 'express';
import { BaseService } from '../services/BaseService';

const baseService = new BaseService();

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const status = err.status || 500;
  res.status(status).json(baseService.error(err.message || 'Internal Server Error', status));
}
