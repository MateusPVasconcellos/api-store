import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcrypt';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { CryptHelper } from '../helpers/crypt-helper';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUsersService {
  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<User | AppError> {
    const usersRepository = getCustomRepository(UsersRepository);

    const userExist = await usersRepository.findByEmail(email);

    if (userExist) {
      throw new AppError('There is already a user with this email', 409);
    }

    const hashedPassword = await CryptHelper.encrypt(password, 8);

    const user = await usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);
    return user;
  }
}

export default new CreateUsersService();
