import { Field, Int, InputType } from '@nestjs/graphql';

import { QuestionType } from '../../../../domain/enums/question-type';

@InputType()
export class UpdateQuestionDto {
  @Field(/* istanbul ignore next */_ => Int, { nullable: true })
  id: number;

  @Field(/* istanbul ignore next */_ => Int, { nullable: true })
  order: number;

  @Field(/* istanbul ignore next */_ => QuestionType, { nullable: true })
  type: QuestionType;

  @Field({ nullable: true })
  title: string;
}
