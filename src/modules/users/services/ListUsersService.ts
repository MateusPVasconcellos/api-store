import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

class ListUsersService {
  public async execute(): Promise<User[]> {
    const users = await UsersRepository.find();

    return users;
  }
}

export default new ListUsersService();
