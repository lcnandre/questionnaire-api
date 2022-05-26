import { IsEmpty, IsString } from 'class-validator';

import { Answer } from '../answer';

export class ShortAnswer extends Answer {
  @IsString()
  @IsEmpty()
  text: string;
}
