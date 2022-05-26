import { IsDefined, IsEmpty, IsOptional } from 'class-validator';
import { Answer } from './answer';

import { Questionnaire } from './questionnaire';

export abstract class Question {
  id?: number;

  @IsDefined()
  order: number;

  @IsEmpty()
  title: string;

  @IsDefined()
  questionnaire: Questionnaire;

  @IsOptional()
  answers?: Answer[] = [];
}
