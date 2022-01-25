import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';

export const errorHandler = function (
  e: Error,
  request: Request,
  response: Response,
) {
  if (e instanceof AppError) {
    console.log('Error', e);
    return response.status(e.httpStatus).json({
      status: 'Error',
      message: e.message,
    });
  }
  return response.status(500).json({
    status: 'Error',
    message: 'Internal Server Error',
  });
};
