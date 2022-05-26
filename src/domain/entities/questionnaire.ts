import { ArrayNotEmpty, IsArray, IsDefined, IsEmpty, IsOptional, ValidateNested } from 'class-validator';

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
}
