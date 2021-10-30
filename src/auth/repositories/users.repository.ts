import { EntityRepository } from '@mikro-orm/knex';

import { User } from '../entities/users.entity';

export class UserRepository extends EntityRepository<User> {}
