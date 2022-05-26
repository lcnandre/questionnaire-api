import { IsEmpty, IsString } from 'class-validator';

import { Answer } from '../answer';
import { ShortAnswerQuestion } from '../questions/short-answer-question';
import { User } from '../user';

export class ShortAnswer extends Answer {
  @IsString()
  @IsEmpty()
  text: string;

  constructor(user: User, question: ShortAnswerQuestion, text: string) {
    super(user, question);
    this.text = text;
  }
}
