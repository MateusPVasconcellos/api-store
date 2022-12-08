import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = function (
  e: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (e instanceof AppError) {
    console.log('Error', e);
    return response.status(e.httpStatus).json({
      status: 'Error',
      message: e.message,
    });
  }
  if (e) {
    console.log('Error', e);
    return response.status(500).json({
      status: 'Error',
      message: 'Internal Server Error',
    });
  }

  next();
};
