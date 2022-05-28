import { EntityRepository } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { PassportModule } from '@nestjs/passport';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

import createMockRepository from '../../../test/repository.mock';
import { JWT_SECRET, JWT_EXPIRATION } from '../../application/auth/auth.consts';
import { User } from '../entities/user';
import { UserService } from './user.service';
import { JwtStrategy } from '../../application/auth/jwt.strategy';
import { GetUserHandler } from '../use-cases/user/get-user';
import { ValidateUserHandler } from '../use-cases/user/validate-user';

describe('UserService (service)', () =>  {
  let service: UserService;
  let user: User;
  
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
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository<User>()
        },
        JwtStrategy,
        GetUserHandler,
        ValidateUserHandler,
      ],
    }).compile();
    await module.init();

    service = module.get<UserService>(UserService);

    const repository = module.get<EntityRepository<User>>(getRepositoryToken(User));
    user = new User('test', 'test@test.com', '123');
    await repository.persistAndFlush(user);
  });

  it ('Should return the user by id', async () => {
    const result = await service.getUser(user.id);
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(User);
  });

  it ('Should return a jwt if the email and password are correct', async () => {
    const result = await service.validateUser('test@test.com', '123');
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
  });

  it ('Should return undefined if the email and password are incorrect', async () => {
    const result = await service.validateUser('', '');
    expect(result).toBeUndefined();
  });
});
