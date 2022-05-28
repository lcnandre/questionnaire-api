import { Field, ID, InputType } from '@nestjs/graphql';

import { UpdateQuestionDto } from './update-question.dto';

@InputType()
export class UpdateQuestionnaireDto {
  @Field(/* istanbul ignore next */_ => ID)
  id!: number;

  @Field()
  title?: string;

  @Field(/* istanbul ignore next */_ => [UpdateQuestionDto])
  questions?: UpdateQuestionDto[];
}
