import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IPaginateUser {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: User[];
}

class ListUsersService {
  public async execute(): Promise<IPaginateUser> {
    const users = await UsersRepository.find().paginate();

    return users as IPaginateUser;
  }
}

export default new ListUsersService();
