import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute(): Promise<IUser[] | null> {
    const users = await this.usersRepository.findAllUsers();

    return users;
  }
}

export default ListUsersService;
