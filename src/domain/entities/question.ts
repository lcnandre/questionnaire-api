import { Entity, Enum, ManyToOne, OneToMany, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { IsDefined, IsEmpty, IsOptional } from 'class-validator';
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

  @IsEmpty()
  @Property()
  title: string;

  @IsDefined()
  @ManyToOne()
  questionnaire: Questionnaire;

  @IsOptional()
  @OneToMany(() => Answer, answer => answer.question)
  answers?: Answer[] = [];

  @Enum(() => QuestionType)
  type!: QuestionType;

  constructor(order: number, title: string) {
    this.order = order;
    this.title = title;
  }
}
