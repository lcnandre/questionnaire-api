import {  UnauthorizedException } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { PassportModule } from '@nestjs/passport';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

import createMockRepository from '../../../../test/repository.mock';
import { JWT_SECRET, JWT_EXPIRATION } from '../../../application/auth/auth.consts';
import { UserService } from '../../../domain/services/user.service';
import { User } from '../../../domain/entities/user';
import { JwtStrategy } from '../../../application/auth/jwt.strategy';
import { ValidateUserHandler } from '../../../domain/use-cases/user/validate-user';
import { UserResolver } from './user.resolver';
import { LoginDto } from './dtos/login.dto';

describe('UserResolver (resolver)', () => {
  let resolver: UserResolver;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        CqrsModule,
        PassportModule,
        JwtModule.register({
          secret: JWT_SECRET,
          signOptions: { expiresIn: JWT_EXPIRATION },
        }),
      ],
      providers: [
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository<User>()
        },
        JwtStrategy,
        UserService,
        UserResolver,
        ValidateUserHandler,
      ]
    }).compile();
    await module.init();

    resolver = module.get<UserResolver>(UserResolver);

    const repository = module.get<EntityRepository<User>>(getRepositoryToken(User));
    const user = new User('test', 'test@test.com', '123');
    await repository.persistAndFlush(user);
  });

  it ('Should return true if the email and password are correct', async () => {
    const result = await resolver.login({
      email: 'test@test.com',
      password: '123'
    } as LoginDto);
    expect(result).toBeDefined();
    expect(result.accessToken).toBeDefined();
    expect(result.accessToken.length).toBeGreaterThan(0);
  });

  it ('Should throw UnauthorizedException email or password are invalid', async () => {
    await expect(resolver.login({} as LoginDto))
      .rejects
      .toThrow(UnauthorizedException);
  });
});
