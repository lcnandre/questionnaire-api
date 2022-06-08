import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { IsDefined, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import shortid from 'shortid';
import { CollectionNotEmpty } from '../validators/collection-not-empty';

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

  @CollectionNotEmpty()
  @ValidateNested()
  @OneToMany(/* istanbul ignore next */ () => Question, /* istanbul ignore next */ question => question.questionnaire, { orphanRemoval: true })
  questions = new Collection<Question>(this);

  constructor(creator: User, title: string, questions: Question[]) {
    this.creator = creator;
    this.title = title;
    for (const q of questions) {
      this.questions.add(q);
    }
    this.shareUrl = `${creator?.id}/${shortid.generate()}`;
  }
}
