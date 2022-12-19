import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import httpStatus from 'http-status-codes';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  user_id: string;
}

class ShowProfileService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', httpStatus.NOT_FOUND);
    }

    return user;
  }
}

export default new ShowProfileService();
