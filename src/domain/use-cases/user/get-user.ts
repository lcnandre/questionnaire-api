import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { User } from '../../entities/user';

export class GetUserQuery {
  constructor(public readonly id: number) { }
}

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(@InjectRepository(User) private readonly repository: EntityRepository<User>) { }

  execute(query: GetUserQuery): Promise<User> {
    const { id } = query;
    return this.repository.findOne({ id });
  }
}
