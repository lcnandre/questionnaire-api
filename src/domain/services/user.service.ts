import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { GetUserQuery } from '../use-cases/user/get-user';
import { ValidateUserQuery } from '../use-cases/user/validate-user';

@Injectable()
export class UserService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly jwtService: JwtService,
  ) { }

  getUser(id: number) {
    return this.queryBus.execute(
      new GetUserQuery(id)
    );
  }

  async validateUser(email: string, password: string): Promise<string> {
    const user = await this.queryBus.execute(
      new ValidateUserQuery(email, password)
    );

    if (user) {
      return this.jwtService.sign({
        username: user.email,
        sub: user.id,
      });
    }

    return undefined;
  }
}
