import AppError from '@shared/errors/AppError';
import { CryptHelper } from '../helpers/crypt-helper';
import authConfig from '@config/auth';
import { JwtHelper } from '../helpers/jwt-helper';
import httpStatus from 'http-status-codes';
import { ICreateSession } from '../domain/models/ICreateSession';
import { IUserAuthenticated } from '../domain/models/IUserAuthenticated';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';

@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({
    email,
    password,
  }: ICreateSession): Promise<IUserAuthenticated> {
    const user = await this.usersRepository.findByEmail(email);

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

export default CreateSessionService;
