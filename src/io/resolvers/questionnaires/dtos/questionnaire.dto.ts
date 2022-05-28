import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Questionnaire } from '../../../../domain/entities/questionnaire';
import { QuestionDto } from './question.dto';

@ObjectType({ description: 'questionnaire' })
export class QuestionnaireDto {
  @Field(/* istanbul ignore next */_ => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  shareUrl: string;

  @Field(/* istanbul ignore next */_ => [QuestionDto])
  questions: QuestionDto[];

  static fromQuestionnaire(questionnaire: Questionnaire) {
    return {
      id: questionnaire.id,
      title: questionnaire.title,
      shareUrl: questionnaire.shareUrl,
      questions: questionnaire.questions.getItems().map(q => QuestionDto.fromQuestion(q)),
    } as QuestionnaireDto;
  }
}
