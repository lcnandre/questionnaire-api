import { EntityRepository } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import createMockRepository from '../../../test/repository.mock';
import { Questionnaire } from '../entities/questionnaire';
import { ShortAnswerQuestion } from '../entities/questions/short-answer-question';
import { User } from '../entities/user';
import { QuestionType } from '../enums/question-type';
import { CreateQuestionnaireHandler } from '../use-cases/questionnaire/create-questionnaire';
import { GetQuestionnaireHandler } from '../use-cases/questionnaire/get-questionnaire';
import { UpdateQuestionnaireHandler } from '../use-cases/questionnaire/update-questionnaire';
import { QuestionVo } from '../vos/question.vo';
import { QuestionnaireService } from './questionnaire.service';

describe('QuestionnaireService (service)', () =>  {
  let service: QuestionnaireService;
  let questionnaire: Questionnaire;
  let user: User;
  
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        QuestionnaireService,
        {
          provide: getRepositoryToken(Questionnaire),
          useValue: createMockRepository<Questionnaire>()
        },
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository<User>()
        },
        GetQuestionnaireHandler,
        CreateQuestionnaireHandler,
        UpdateQuestionnaireHandler,
      ],
    }).compile();
    await module.init();

    service = module.get<QuestionnaireService>(QuestionnaireService);

    const userRepository = module.get<EntityRepository<User>>(getRepositoryToken(User));
    user = new User('test', 'test@test.com', '123');
    await userRepository.persistAndFlush(user);

    const question = new ShortAnswerQuestion(1, 'First question');

    const repository = module.get<EntityRepository<Questionnaire>>(getRepositoryToken(Questionnaire));
    questionnaire = new Questionnaire(user, 'Test questionnaire', [question]);
    await repository.persistAndFlush(questionnaire);
  });

  it ('Should get the questionnaire given the shareUrl', async () => {
    const result = await service.getQuestionnaire(questionnaire.shareUrl);
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Questionnaire);
  });

  it ('Should create a questionnaire given valid data', async () => {
    const result = await service.createQuestionnaire(user, 'Test questionnaire', [
      new QuestionVo(1, 'First question', QuestionType.ShortAnswer),
      new QuestionVo(2, 'Second question', QuestionType.ShortAnswer),
    ]);
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Questionnaire);
    expect(result.id).toBeGreaterThan(0);
  });

  it ('Should update an existing questionnaire', async () => {
    const result = await service.updateQuestionnaire(questionnaire.id, 'Teste questionnaire v2');
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Questionnaire);
    expect(result.title).toBe('Teste questionnaire v2');
  });
});
