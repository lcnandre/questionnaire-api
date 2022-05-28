import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { Question } from '../../../../domain/entities/question';

@ObjectType({ description: 'question' })
export class QuestionDto {
  @Field(/* istanbul ignore next */_ => ID)
  id: number;

  @Field(/* istanbul ignore next */_ => Int)
  order: number;

  @Field()
  title: string;

  static fromQuestion(question: Question) {
    return {
      id: question.id,
      order: question.order,
      title: question.title,
    } as QuestionDto;
  }
}
