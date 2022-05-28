import { Field, Int, ObjectType } from '@nestjs/graphql';

import { QuestionType } from '../../../../domain/enums/question-type';
import { Question } from '../../../../domain/entities/question';

@ObjectType({ description: 'question' })
export class QuestionDto {
  @Field(/* istanbul ignore next */_ => Int)
  id: number;

  @Field(/* istanbul ignore next */_ => Int)
  order: number;

  @Field()
  title: string;

  @Field(/* istanbul ignore next */_ => QuestionType)
  type: QuestionType;

  static fromQuestion(question: Question) {
    return {
      id: question.id,
      order: question.order,
      title: question.title,
      type: question.type,
    } as QuestionDto;
  }
}
