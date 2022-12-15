import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import httpStatus from 'http-status-codes';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { CryptHelper } from '../helpers/crypt-helper';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', httpStatus.NOT_FOUND);
    }

    const userUpdateEmail = await usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user.id) {
      throw new AppError(
        'There is already a user with this email.',
        httpStatus.CONFLICT,
      );
    }

    if (password && !old_password) {
      throw new AppError('Old password is required.', httpStatus.BAD_REQUEST);
    }

    if (password && old_password) {
      const checkOldPass = await CryptHelper.compare(
        old_password,
        user.password,
      );
      if (!checkOldPass) {
        throw new AppError(
          'Old password does not match.',
          httpStatus.UNAUTHORIZED,
        );
      }
      user.password = await CryptHelper.encrypt(password, 10);
    }
    user.name = name;
    user.email = email;

    await usersRepository.save(user);

    return user;
  }
}

export default new UpdateProfileService();
