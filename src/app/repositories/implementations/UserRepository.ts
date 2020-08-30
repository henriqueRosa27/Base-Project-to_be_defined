import { Repository, EntityRepository } from 'typeorm';
import IUserRepository from '../IUserRepository';
import User from '../../models/User';

interface TicoNoUser {
  name: string;
  email: string;
  password: string;
  surname: string;
}

@EntityRepository(User)
class UserRepository implements IUserRepository {
  private rep: Repository<User>;

  constructor(rep: Repository<User>) {
    this.rep = rep;
  }

  create(user: User): Promise<User> {
    return this.rep.save(user);
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.rep.findOne({ where: { email } });
  }
}

export default UserRepository;
