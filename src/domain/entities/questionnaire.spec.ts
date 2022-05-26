import { validate } from 'class-validator';

import { Questionnaire } from './questionnaire';
import { ShortAnswerQuestion } from './questions/short-answer-question';
import { User } from './user';

describe('Questionnaire (entity)', () => {
  it ('Should have a valid creator, title and questions', async () => {
    const questionnaire = new Questionnaire(undefined, undefined, undefined);
    const errors = await validate(questionnaire);

    expect(errors.length).toBe(3);
    expect(errors[0].property).toBe('creator');
    expect(errors[1].property).toBe('title');
    expect(errors[2].property).toBe('questions');
  });

  it ('Should generate the shareUrl automatically', () => {
    const creator = new User('Test', 'test@test.com', '123');
    creator.id = 1;
    const question = new ShortAnswerQuestion(1, 'Test question');
    const questionnaire = new Questionnaire(creator, 'Test questionnaire', [question]);

    expect(questionnaire.shareUrl.substring(0, 2)).toBe('1/');
  });
});
