import { Repository, EntityRepository } from "typeorm";
import { injectable } from "inversify";
import IUserRepository from "../IUserRepository";
import User from "../../../domain/models/User";

@injectable()
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
