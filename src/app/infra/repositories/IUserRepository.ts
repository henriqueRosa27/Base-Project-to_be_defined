import User from "../../domain/models/User";

interface IUserRepository {
  create(user: User): Promise<User>;

  findByEmail(email: string): Promise<User | undefined>;
}

export default IUserRepository;
