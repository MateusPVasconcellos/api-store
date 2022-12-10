import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { JwtHelper } from '../../../modules/users/helpers/jwt-helper';
import authConfig from '@config/auth';

interface ITokenPayload {
  exp: number;
  iat: number;
  id: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authToken = request.headers.authorization;
  if (!authToken) {
    throw new AppError('JWT Token is missing.', 401);
  }

  const [, token] = authToken.split(' ');

  const decodedToken = JwtHelper.verify(token, authConfig.jwt.publicKey);
  const { id } = decodedToken as ITokenPayload;

  request.user = {
    id,
  };

  next();
}
