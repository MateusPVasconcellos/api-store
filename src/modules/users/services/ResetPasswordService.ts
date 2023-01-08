import AppError from '@shared/errors/AppError';
import httpStatus from 'http-status-codes';
import { isAfter, addHours } from 'date-fns';
import { CryptHelper } from '../helpers/crypt-helper';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUserTokensRepository } from '../domain/repositories/IUserTokenRepository';
import { IResetPassword } from '../domain/models/IResetPassword';

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ token, password }: IResetPassword): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token not found.', httpStatus.NOT_FOUND);
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User not found.', httpStatus.NOT_FOUND);
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.', httpStatus.UNAUTHORIZED);
    }

    user.password = await CryptHelper.encrypt(password, 8);

    await this.userTokensRepository.deleteToken(userToken.id);
    await this.usersRepository.saveUser(user);
  }
}

export default ResetPasswordService;
