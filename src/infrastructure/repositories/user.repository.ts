import { IUserRepository } from 'src/domain/irepositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/domain/entities';
import { Repository, getRepository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  get(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const qb = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('LOWER(user.email) = LOWER(:email)', { email });

    return await qb.getOne();
  }
}
