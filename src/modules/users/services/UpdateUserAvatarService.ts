import AppError from '@shared/errors/AppError';
import httpStatus from 'http-status-codes';
import DiskStorageProvider from '@shared/provider/storage/DiskStorageProvider';
import upload from '@config/upload';
import S3StorageProvider from '@shared/provider/storage/S3StorageProvider';
import { IUpdateUserAvatar } from '../domain/models/IUpdateUserAvatar';
import { IUser } from '../domain/models/IUser';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({
    avatarFilename,
    user_id,
  }: IUpdateUserAvatar): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', httpStatus.NOT_FOUND);
    }

    if (upload.driver === 's3') {
      if (user.avatar) {
        await S3StorageProvider.deleteFile(user.avatar);
      }

      const fileName = await S3StorageProvider.saveFile(avatarFilename);

      user.avatar = fileName;
    } else if (upload.driver === 'disk') {
      if (user.avatar) {
        await DiskStorageProvider.deleteFile(user.avatar);
      }

      const fileName = await DiskStorageProvider.saveFile(avatarFilename);

      user.avatar = fileName;
    }

    await this.usersRepository.saveUser(user);

    return user;
  }
}

export default UpdateUserAvatarService;
