import { Entity, Enum, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { IsDefined } from 'class-validator';
import { QuestionType } from '../enums/question-type';

import { Question } from './question';
import { User } from './user';

@Entity({
  discriminatorColumn: 'type',
  abstract: true,
})
export abstract class Answer {
  @PrimaryKey({ autoincrement: true })
  id?: number;

  @IsDefined()
  @ManyToOne()
  user: User;

  @IsDefined()
  @ManyToOne()
  question: Question;

  @Enum(() => QuestionType)
  type!: QuestionType;

  constructor(user: User, question: Question) {
    this.user = user;
    this.question = question;
  }
}
