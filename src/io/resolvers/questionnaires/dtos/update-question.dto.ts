import { Field, Int, InputType } from '@nestjs/graphql';

import { QuestionType } from '../../../../domain/enums/question-type';

@InputType()
export class UpdateQuestionDto {
  @Field(/* istanbul ignore next */_ => Int)
  id!: number;

  @Field(/* istanbul ignore next */_ => Int)
  order!: number;

  @Field(/* istanbul ignore next */_ => QuestionType)
  type!: QuestionType;

  @Field()
  title!: string;
}
