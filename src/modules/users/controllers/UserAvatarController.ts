import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import httpStatus from 'http-status-codes';

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    if (!request.file?.filename) {
      throw new AppError('Missing file name.', httpStatus.BAD_REQUEST);
    }
    const user = UpdateUserAvatarService.execute({
      userId: request.user.id,
      avatarFileName: request.file.filename,
    });

    return response.json(user);
  }
}

export default new UserAvatarController();
