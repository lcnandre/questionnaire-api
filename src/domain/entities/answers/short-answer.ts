import { Entity, Property } from '@mikro-orm/core';
import { IsEmpty, IsString } from 'class-validator';

import { Answer } from '../answer';
import { ShortAnswerQuestion } from '../questions/short-answer-question';
import { QuestionType } from '../../enums/question-type';
import { User } from '../user';

@Entity({ discriminatorValue: QuestionType.ShortAnswer })
export class ShortAnswer extends Answer {
  @IsString()
  @IsEmpty()
  @Property()
  text: string;

  constructor(user: User, question: ShortAnswerQuestion, text: string) {
    super(user, question);
    this.text = text;
  }
}
