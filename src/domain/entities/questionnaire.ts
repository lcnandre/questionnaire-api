import { Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { ArrayNotEmpty, IsArray, IsDefined, IsEmpty, IsOptional, ValidateNested } from 'class-validator';
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

  @IsEmpty()
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

  constructor(creator: User) {
    this.creator = creator;
    this.shareUrl = `${creator.id}/${shortid.generate()}`;
  }
}
