import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';

import { QuestionType } from '../../../../domain/enums/question-type';

registerEnumType(QuestionType, {
  name: 'QuestionType',
});

@InputType()
export class AddQuestionDto {
  @Field(/* istanbul ignore next */_ => Int)
  order!: number;

  @Field(/* istanbul ignore next */_ => QuestionType)
  type!: QuestionType;

  @Field()
  title!: string;
}
