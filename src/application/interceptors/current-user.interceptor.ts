import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

import { User } from '../../domain/entities/user';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(@InjectRepository(User) private readonly repository: EntityRepository<User>) { }

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    
    if (user) {
      ctx.getContext().req.user = await this.repository.findOne({ id: user.sub });
    }

    return next.handle();
  }
}
