import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

import { UserRepository } from '../repositories/users.repository';

@Entity({ collection: 'users', customRepository: () => UserRepository })
export class User {
  constructor(username: string, password: string, email: string, name: string) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.name = name;
  }

  @PrimaryKey()
  user_id: number;

  @Property()
  name: string;

  @Property()
  username: string;

  @Property()
  email: string;

  @Property()
  password: string;
}
