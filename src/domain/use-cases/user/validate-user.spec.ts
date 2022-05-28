import { getRepositoryToken } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Test } from '@nestjs/testing';

import createMockRepository from '../../../../test/repository.mock';
import { User } from '../../../domain/entities/user';
import { ValidateUserQuery, ValidateUserHandler } from './validate-user';

describe('Validate user (use case)', () => {
  let repository: EntityRepository<User>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository<User>()
        }
      ]
    }).compile();

    repository = module.get<EntityRepository<User>>(getRepositoryToken(User));
    const user = new User('test', 'test@test.com', '123');
    await repository.persistAndFlush(user);
  });

  it ('Should return the user if the email and password are correct', async () => {
    const result = await validateUser('test@test.com', '123');
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(User);
  });

  it ('Should return undefined if no user is found', async () => {
    const result = await validateUser('', '');
    expect(result).toBeUndefined();
  });

  it ('Should return undefined if password is incorrent', async () => {
    const result = await validateUser('test@test.com', '');
    expect(result).toBeUndefined();
  });

  const validateUser = (email: string, password: string): Promise<User> => {
    const query = new ValidateUserQuery(email, password);
    const handler = new ValidateUserHandler(repository);
    return handler.execute(query);
  }
});
