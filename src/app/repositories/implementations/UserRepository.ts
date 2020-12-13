import { Repository, EntityRepository, getRepository } from 'typeorm';
import { injectable } from 'inversify';
import IUserRepository from '../IUserRepository';
import User from '../../models/User';

@injectable()
@EntityRepository(User)
class UserRepository implements IUserRepository {
  private rep: Repository<User>;

  constructor() {
    this.rep = getRepository(User);
  }

  create(user: User): Promise<User> {
    return this.rep.save(user);
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.rep.findOne({ where: { email } });
  }
}

export default UserRepository;
