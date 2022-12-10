import jwt from 'jsonwebtoken';
import HttpStatus from 'http-status-codes';
import { throwIf } from '@shared/helpers/throw-if';
import AppError from '@shared/errors/AppError';

const JSON_WEB_TOKEN_ERROR = 'JsonWebTokenError';

export class JwtHelper {
  static sign(payload: any, privateKey: string, expiresIn: string) {
    const decodedPrivateKey = Buffer.from(privateKey, 'base64').toString();
    return jwt.sign(payload, decodedPrivateKey, {
      expiresIn,
      algorithm: 'RS256',
    });
  }

  static verify(token: string, publicKey: string) {
    try {
      const decodedPublicKey = Buffer.from(publicKey, 'base64').toString();
      return jwt.verify(token, decodedPublicKey);
    } catch (e: any) {
      throwIf(
        new AppError('Expired token.', HttpStatus.UNAUTHORIZED),
        e.name === 'TokenExpiredError',
      );
      throwIf(
        new AppError('Invalid token.', HttpStatus.UNAUTHORIZED),
        e.name === JSON_WEB_TOKEN_ERROR && e.message === 'jwt malformed',
      );
      throwIf(
        new AppError('Error validating token.', HttpStatus.UNAUTHORIZED),
        e.name === JSON_WEB_TOKEN_ERROR,
      );
      throw e;
    }
  }
}
