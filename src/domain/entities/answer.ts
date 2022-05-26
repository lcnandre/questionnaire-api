import { IsDefined } from 'class-validator';

import { Question } from './question';
import { User } from './user';

export abstract class Answer {
  id?: number;

  @IsDefined()
  user: User;

  @IsDefined()
  question: Question;

  constructor(user: User, question: Question) {
    this.user = user;
    this.question = question;
  }
}
