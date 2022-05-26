import { Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { ArrayNotEmpty, IsArray, IsDefined, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import shortid from 'shortid';

import { Question } from './question';
import { User } from './user';

@Entity()
export class Questionnaire {
  @PrimaryKey({ autoincrement: true })
  id?: number;

  @IsDefined()
  @ManyToOne()
  creator: User;

  @IsNotEmpty()
  @Property()
  title: string;

  @IsOptional()
  @Property()
  shareUrl?: string;

  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @OneToMany(() => Question, question => question.questionnaire)
  questions: Question[];

  constructor(creator: User, title: string, questions: Question[]) {
    this.creator = creator;
    this.title = title;
    this.questions = questions;
    this.shareUrl = `${creator?.id}/${shortid.generate()}`;
  }
}
