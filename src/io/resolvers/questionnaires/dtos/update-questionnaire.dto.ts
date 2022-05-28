import { Field, Int, InputType } from '@nestjs/graphql';

import { UpdateQuestionDto } from './update-question.dto';

@InputType()
export class UpdateQuestionnaireDto {
  @Field(/* istanbul ignore next */_ => Int)
  id!: number;

  @Field({ nullable: true })
  title?: string;

  @Field(/* istanbul ignore next */_ => [UpdateQuestionDto], { nullable: true })
  questions?: UpdateQuestionDto[];
}
