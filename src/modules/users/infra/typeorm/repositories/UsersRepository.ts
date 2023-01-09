import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { AppDataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import User from '../entities/User';

class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User);
  }

  public async saveUser(user: User): Promise<User> {
    await this.ormRepository.save(user);

    return user;
  }

  public async findAllUsers(): Promise<User[] | null> {
    const users = await this.ormRepository.find();

    return users;
  }

  public async findByName(name: string): Promise<User | null> {
    const user = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async createUser({
    name,
    email,
    password,
  }: ICreateUser): Promise<User> {
    const user = await this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }
}

export default UsersRepository;
