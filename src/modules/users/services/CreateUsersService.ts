import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

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

    const userExists = await usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('There is already a user with this email', 409);
    }

    const user = await usersRepository.create({
      name,
      email,
      password,
    });

    await usersRepository.save(user);
    return user;
  }
}

export default new CreateUsersService();
