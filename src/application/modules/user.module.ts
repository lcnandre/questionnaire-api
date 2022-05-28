import { MikroOrmModule } from '@mikro-orm/nestjs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { User } from '../../domain/entities/user';
import { UserService } from '../../domain/services/user.service';
import { UserResolver } from '../../io/resolvers/users/user.resolver';
import { JWT_EXPIRATION, JWT_SECRET } from '../auth/auth.consts';
import { ValidateUserHandler } from '../../domain/use-cases/user/validate-user';
import { GetUserHandler } from '../../domain/use-cases/user/get-user';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [
    CqrsModule,
    PassportModule,
    MikroOrmModule.forFeature({
      entities: [User]
    }),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRATION },
    }),
  ],
  providers: [
    JwtStrategy,
    UserResolver,
    UserService,
    GetUserHandler,
    ValidateUserHandler,
  ],
  exports: [
    CqrsModule,
    JwtModule,
    PassportModule,
  ],
})
export class UserModule { }