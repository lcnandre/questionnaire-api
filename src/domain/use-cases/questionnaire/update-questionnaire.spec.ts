import { getRepositoryToken } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Test } from '@nestjs/testing';

import createMockRepository from '../../../../test/repository.mock';
import { Questionnaire } from '../../../domain/entities/questionnaire';
import { User } from '../../../domain/entities/user';
import { ShortAnswerQuestion } from '../../../domain/entities/questions/short-answer-question';
import { QuestionVo } from '../../../domain/vos/question.vo';
import { UpdateQuestionnaireCommand, UpdateQuestionnaireHandler } from './update-questionnaire';
import { QuestionType } from '../../../domain/enums/question-type';
import { Question } from '../../../domain/entities/question';

describe('Update questionnaire (use case)', () => {
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
          provide: getRepositoryToken(Question),
          useValue: createMockRepository<Question>()
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

    const questionRepository = module.get<EntityRepository<Question>>(getRepositoryToken(Question));
    const questionA = new ShortAnswerQuestion(1, 'First question');
    const questionB = new ShortAnswerQuestion(2, 'Second question');
    await questionRepository.persistAndFlush([questionA, questionB]);

    repository = module.get<EntityRepository<Questionnaire>>(getRepositoryToken(Questionnaire));
    questionnaire = new Questionnaire(user, 'Test questionnaire', [questionA, questionB]);
    await repository.persistAndFlush(questionnaire);
  });

  it ('Should be able to update only the title', async () => {
    const result = await updateQuestionnaire('Teste questionnaire v2');
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Questionnaire);
    expect(result.title).toBe('Teste questionnaire v2');
  });

  it ('Should be able to update only the questions', async () => {
    const updatedQuestions = questionnaire.questions.getItems()
      .map(q => {
        q.order += 1;
        q.type = QuestionType.ShortAnswer;
        return q
      })
      .map(q => QuestionVo.fromQuestion(q));
    const result = await updateQuestionnaire(undefined, updatedQuestions);
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Questionnaire);
    expect(result.questions).toBeDefined();
    expect(result.questions.count()).toBe(2);
    expect(result.questions[0].order).toBe(2);
    expect(result.questions[1].order).toBe(3);
  });

  it ('Should not update if no parameters are passed', async () => {
    const result = await updateQuestionnaire('', []);
    expect(result).toEqual(questionnaire);
  });

  const updateQuestionnaire = (title?: string, questions?: QuestionVo[]): Promise<Questionnaire> => {
    const command = new UpdateQuestionnaireCommand(questionnaire, title, questions);
    const handler = new UpdateQuestionnaireHandler(repository);
    return handler.execute(command);
  }
});
