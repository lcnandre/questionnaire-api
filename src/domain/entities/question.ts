import { Collection, Entity, Enum, ManyToOne, OneToMany, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { IsDefined, IsNotEmpty, IsOptional } from 'class-validator';
import { QuestionType } from '../enums/question-type';
import { Answer } from './answer';

import { Questionnaire } from './questionnaire';

@Entity({
  discriminatorColumn: 'type',
  abstract: true,
})
export abstract class Question {
  @PrimaryKey({ autoincrement: true })
  id?: number;

  @IsDefined()
  @Property()
  order: number;

  @IsNotEmpty()
  @Property()
  title: string;

  @ManyToOne()
  questionnaire: Questionnaire;

  @IsOptional()
  @OneToMany(/* istanbul ignore next */ () => Answer, /* istanbul ignore next */ answer => answer.question)
  answers = new Collection<Answer>(this);

  @Enum(/* istanbul ignore next */ () => QuestionType)
  type!: QuestionType;

  constructor(order: number, title: string, id?: number) {
    this.order = order;
    this.title = title;
    if (id) {
      this.id = id;
    }
  }
}
