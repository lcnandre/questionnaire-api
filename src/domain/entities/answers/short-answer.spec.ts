import { validate } from 'class-validator';

import { ShortAnswer } from './short-answer';

describe('ShortAnswer (entity)', () => {
  it ('Should have a valid user, question and text', async () => {
    const answer = new ShortAnswer(undefined, undefined, undefined);
    const errors = await validate(answer);

    expect(errors.length).toBe(3);
    expect(errors[0].property).toBe('text');
    expect(errors[1].property).toBe('user');
    expect(errors[2].property).toBe('question');
  });
});
