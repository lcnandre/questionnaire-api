import { getRepositoryToken } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Test } from '@nestjs/testing';

import createMockRepository from '../../../../test/repository.mock';
import { User } from '../../../domain/entities/user';
import { GetUserQuery, GetUserHandler } from './get-user';

describe('Get user (use case)', () => {
  let repository: EntityRepository<User>;
  let user: User;

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
    user = new User('test', 'test@test.com', '123');
    await repository.persistAndFlush(user);
  });

  it ('Should return false if no user is found', async () => {
    const result = await getUser(user.id);
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(User);
  });

  it ('Should return null if user does not exists', async () => {
    const result = await getUser(-1);
    expect(result).toBe(null);
  });

  const getUser = (id: number): Promise<User> => {
    const query = new GetUserQuery(id);
    const handler = new GetUserHandler(repository);
    return handler.execute(query);
  }
});
