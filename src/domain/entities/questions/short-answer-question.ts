import { Entity } from '@mikro-orm/core';

import { QuestionType } from '../../enums/question-type';
import { Question } from '../question';

@Entity({ discriminatorValue: QuestionType.ShortAnswer })
export class ShortAnswerQuestion extends Question { }
