import AppError from '@shared/errors/AppError';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import httpStatus from 'http-status-codes';
import DiskStorageProvider from '@shared/provider/storage/DiskStorageProvider';
import upload from '@config/upload';
import S3StorageProvider from '@shared/provider/storage/S3StorageProvider';
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

    if (upload.driver === 's3') {
      if (user.avatar) {
        await S3StorageProvider.deleteFile(user.avatar);
      }

      const fileName = await S3StorageProvider.saveFile(avatarFileName);

      user.avatar = fileName;
    } else if (upload.driver === 'disk') {
      if (user.avatar) {
        await DiskStorageProvider.deleteFile(user.avatar);
      }

      const fileName = await DiskStorageProvider.saveFile(avatarFileName);

      user.avatar = fileName;
    }

    await UsersRepository.save(user);

    return user;
  }
}

export default new UpdateUserAvatarService();
