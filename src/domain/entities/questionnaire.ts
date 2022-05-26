import { ArrayNotEmpty, IsArray, IsDefined, IsEmpty, IsOptional, ValidateNested } from 'class-validator';
import shortid from 'shortid';

import { Question } from './question';
import { User } from './user';

export class Questionnaire {
  id?: number;

  @IsDefined()
  creator: User;

  @IsEmpty()
  title: string;

  @IsOptional()
  shareUrl?: string;

  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  questions: Question[];

  constructor(creator: User) {
    this.creator = creator;
    this.shareUrl = `${creator.id}/${shortid.generate()}`;
  }
}
