import { EntityRepository } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import createMockRepository from '../../../test/repository.mock';
import { Questionnaire } from '../entities/questionnaire';
import { ShortAnswerQuestion } from '../entities/questions/short-answer-question';
import { User } from '../entities/user';
import { GetQuestionnaireHandler } from '../use-cases/questionnaire/get-questionnaire';
import { QuestionnaireService } from './questionnaire.service';

describe('QuestionnaireService (service)', () =>  {
  let service: QuestionnaireService;
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
        GetQuestionnaireHandler,
      ]
    }).compile();

    service = module.get<QuestionnaireService>(QuestionnaireService);

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
    const result = await service.getQuestionnaire(questionnaire.shareUrl);
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Questionnaire);
  });
});
