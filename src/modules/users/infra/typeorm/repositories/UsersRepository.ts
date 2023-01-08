import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import { DataSource, Repository } from 'typeorm';
import User from '../entities/User';

class UsersRepository extends Repository<User> implements IUserRepository {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async saveUser(user: User): Promise<User> {
    await this.save(user);

    return user;
  }

  public async findAllUsers(): Promise<User[] | null> {
    const users = await this.find();

    return users;
  }

  public async findByName(name: string): Promise<User | null> {
    const user = await this.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.findOne({
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
    const user = await this.create({ name, email, password });

    await this.save(user);

    return user;
  }
}

export default UsersRepository;
