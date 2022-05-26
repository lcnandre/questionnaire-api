import { getRepositoryToken } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Test } from '@nestjs/testing';

import createMockRepository from '../../../../test/repository.mock';
import { Questionnaire } from '../../../domain/entities/questionnaire';
import { User } from '../../../domain/entities/user';
import { ShortAnswerQuestion } from '../../../domain/entities/questions/short-answer-question';
import { GetQuestionnaireHandler, GetQuestionnaireQuery } from './get-questionnaire';

describe('Get questionnaire (use case)', () => {
  let repository: EntityRepository<Questionnaire>;
  let questionnaire: Questionnaire;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Questionnaire),
          useValue: createMockRepository<Questionnaire>()
        },
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository<User>()
        }
      ]
    }).compile();

    const userRepository = module.get<EntityRepository<User>>(getRepositoryToken(User));
    const user = new User('test', 'test@test.com', '123');
    await userRepository.persistAndFlush(user);

    const question = new ShortAnswerQuestion(1, 'First question');

    repository = module.get<EntityRepository<Questionnaire>>(getRepositoryToken(Questionnaire));
    questionnaire = new Questionnaire(user, 'Test questionnaire', [question]);
    await repository.persistAndFlush(questionnaire);
  });

  it ('Should get the questionnaire given the shareUrl', async () => {
    const result = await getQuestionnaire(questionnaire.shareUrl);
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Questionnaire);
  });

  it ('Should return null if no questionnaire is found', async () => {
    const result = await getQuestionnaire('');
    expect(result).toBe(null);
  })

  const getQuestionnaire = (shareUrl: string): Promise<Questionnaire> => {
    const query = new GetQuestionnaireQuery(shareUrl);
    const handler = new GetQuestionnaireHandler(repository);
    return handler.execute(query);
  }
});
