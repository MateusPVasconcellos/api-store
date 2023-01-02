import AppError from '@shared/errors/AppError';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';
import User from '../typeorm/entities/User';
import httpStatus from 'http-status-codes';
import DiskStorageProvider from '@shared/provider/DiskStorageProvider';

interface IRequest {
  userId: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ avatarFileName, userId }: IRequest): Promise<User> {
    const user = await UsersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.', httpStatus.NOT_FOUND);
    }

    if (user.avatar) {
      await DiskStorageProvider.deleteFile(user.avatar);
    }

    const fileName = await DiskStorageProvider.saveFile(avatarFileName);

    user.avatar = fileName;

    await UsersRepository.save(user);

    return user;
  }
}

export default new UpdateUserAvatarService();
