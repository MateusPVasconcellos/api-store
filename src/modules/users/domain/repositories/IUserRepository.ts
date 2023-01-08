import { ICreateUser } from '../models/ICreateUser';
import { IUser } from '../models/IUser';

export interface IUserRepository {
  findByName(name: string): Promise<IUser | null>;

  findById(id: string): Promise<IUser | null>;

  findByEmail(email: string): Promise<IUser | null>;

  findAllUsers(): Promise<IUser[] | null>;

  saveUser(user: IUser): Promise<IUser>;

  createUser({ name, email, password }: ICreateUser): Promise<IUser>;
}
