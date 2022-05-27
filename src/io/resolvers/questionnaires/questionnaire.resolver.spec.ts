import { EntityRepository } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import createMockRepository from '../../../../test/repository.mock';
import { QuestionnaireService } from '../../../domain/services/questionnaire.service';
import { Questionnaire } from '../../../domain/entities/questionnaire';
import { ShortAnswerQuestion } from '../../../domain/entities/questions/short-answer-question';
import { User } from '../../../domain/entities/user';
import { GetQuestionnaireHandler } from '../../../domain/use-cases/questionnaire/get-questionnaire';
import { QuestionnaireResolver } from './questionnaire.resolver';
import { NotFoundException } from '@nestjs/common';

describe('QuestionnaireResolver (resolver)', () => {
  let resolver: QuestionnaireResolver;
  let questionnaire: Questionnaire;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        {
          provide: getRepositoryToken(Questionnaire),
          useValue: createMockRepository<Questionnaire>()
        },
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository<User>()
        },
        QuestionnaireService,
        QuestionnaireResolver,
        GetQuestionnaireHandler,
      ]
    }).compile();

    resolver = module.get<QuestionnaireResolver>(QuestionnaireResolver);

    const userRepository = module.get<EntityRepository<User>>(getRepositoryToken(User));
    const user = new User('test', 'test@test.com', '123');
    await userRepository.persistAndFlush(user);

    const question = new ShortAnswerQuestion(1, 'First question');

    const repository = module.get<EntityRepository<Questionnaire>>(getRepositoryToken(Questionnaire));
    questionnaire = new Questionnaire(user, 'Test questionnaire', [question]);
    await repository.persistAndFlush(questionnaire);

    const app = module.createNestApplication();
    await app.init();
  });

  it ('Should get the questionnaire given the shareUrl', async () => {
    const result = await resolver.questionnaire(questionnaire.shareUrl);
    expect(result).toBeDefined();
    expect(result.title).toBe('Test questionnaire');
  });

  it ('Should throw NotFoundException when questionnarie doesnt exists', async () => {
    await expect(resolver.questionnaire('aa'))
      .rejects
      .toThrow(NotFoundException);
  });
});
