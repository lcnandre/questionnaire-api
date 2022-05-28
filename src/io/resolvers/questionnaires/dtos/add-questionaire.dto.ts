import { Field, InputType } from '@nestjs/graphql';

import { AddQuestionDto } from './add-question.dto';

@InputType()
export class AddQuestionnaireDto {
  @Field()
  title!: string;

  @Field(/* istanbul ignore next */_ => [AddQuestionDto])
  questions!: AddQuestionDto[];
}
