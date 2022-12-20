import AppError from '@shared/errors/AppError';
import httpStatus from 'http-status-codes';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';
import { isAfter, addHours } from 'date-fns';
import { CryptHelper } from '../helpers/crypt-helper';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await UserTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token not found.', httpStatus.NOT_FOUND);
    }

    const user = await UsersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User not found.', httpStatus.NOT_FOUND);
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired,', httpStatus.UNAUTHORIZED);
    }

    user.password = await CryptHelper.encrypt(password, 8);

    await UserTokensRepository.delete(userToken.id);
    await UsersRepository.save(user);
  }
}

export default new ResetPasswordService();
