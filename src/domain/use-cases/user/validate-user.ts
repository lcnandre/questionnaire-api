import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { User } from '../../entities/user';

export class ValidateUserQuery {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) { }
}

@QueryHandler(ValidateUserQuery)
export class ValidateUserHandler implements IQueryHandler<ValidateUserQuery> {
  constructor(@InjectRepository(User) private readonly repository: EntityRepository<User>) { }

  async execute(query: ValidateUserQuery): Promise<User> {
    const { email, password} = query;
    const user = await this.repository.findOne({ email });

    if (user && user.validatePassword(password)) {
      return user;
    }

    return undefined;
  }
}
