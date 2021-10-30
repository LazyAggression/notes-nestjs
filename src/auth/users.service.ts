import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';

import { User } from './entities/users.entity';
import { UserRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: UserRepository,
  ) {}

  async getAllUsers() {
    const users = await this.usersRepository.findAll();
    return users;
  }
}
