import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { CryptHelper } from '../helpers/crypt-helper';
import authConfig from '@config/auth';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { JwtHelper } from '../helpers/jwt-helper';
import httpStatus from 'http-status-codes';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid credentials', httpStatus.UNAUTHORIZED);
    }

    const passwordConfirmed = await CryptHelper.compare(
      password,
      user.password,
    );

    if (!passwordConfirmed) {
      throw new AppError('Wrong password', httpStatus.UNAUTHORIZED);
    }

    const token = JwtHelper.sign(
      { id: user.id },
      authConfig.jwt.privateKey,
      authConfig.jwt.expiresIn,
    );

    return { user, token };
  }
}

export default new CreateSessionService();
