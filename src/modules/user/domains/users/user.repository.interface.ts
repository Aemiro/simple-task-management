import { User } from './user';
export interface IUserRepository {
  insert(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<boolean>;
  getAll(withDeleted: boolean): Promise<User[]>;
  getById(id: string, withDeleted: boolean): Promise<User>;
  getByPhoneNumber(phoneNumber: string, withDeleted: boolean): Promise<User>;
  getByEmail(email: string, withDeleted: boolean): Promise<User>;
  archive(id: string): Promise<boolean>;
  restore(id: string): Promise<boolean>;
}
