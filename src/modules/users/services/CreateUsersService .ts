import AppError from '@shared/errors/AppError';
import { CryptHelper } from '../helpers/crypt-helper';
import httpStatus from 'http-status-codes';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUser } from '../domain/models/IUser';
import { ICreateUser } from '../domain/models/ICreateUser';

@injectable()
class CreateUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    const userExist = await this.usersRepository.findByEmail(email);

    if (userExist) {
      throw new AppError(
        'There is already a user with this email.',
        httpStatus.CONFLICT,
      );
    }

    const hashedPassword = await CryptHelper.encrypt(password, 8);

    const user = await this.usersRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUsersService;
