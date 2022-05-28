import { getRepositoryToken } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import createMockRepository from '../../../../test/repository.mock';
import { QuestionType } from '../../../domain/enums/question-type';
import { Questionnaire } from '../../../domain/entities/questionnaire';
import { User } from '../../../domain/entities/user';
import { QuestionVo } from '../../../domain/vos/question.vo';
import { CreateQuestionnaireCommand, CreateQuestionnaireHandler } from './create-questionnaire';

describe('Create questionnaire (use case)', () => {
  let repository: EntityRepository<Questionnaire>;
  let user: User;

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
    user = new User('test', 'test@test.com', '123');
    await userRepository.persistAndFlush(user);
    repository = module.get<EntityRepository<Questionnaire>>(getRepositoryToken(Questionnaire));
  });

  it ('Should create the questionnaire given the user, title and questions', async () => {
    const result = await createQuestionnaire('Test questionnaire', [
      new QuestionVo(1, 'First question', QuestionType.ShortAnswer),
      new QuestionVo(2, 'Second question', QuestionType.ShortAnswer),
    ]);
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Questionnaire);
    expect(result.id).toBeGreaterThan(0);
  });

  it ('Should throw BadRequestException with invalid data', async () => {
    await expect(createQuestionnaire('', undefined))
      .rejects
      .toThrow(BadRequestException);
  })

  const createQuestionnaire = (title: string, questions: QuestionVo[]): Promise<Questionnaire> => {
    const command = new CreateQuestionnaireCommand(user, title, questions);
    const handler = new CreateQuestionnaireHandler(repository);
    return handler.execute(command);
  }
});
