import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Questionnaire } from '../../../../domain/entities/questionnaire';

@ObjectType({ description: 'questionnaire' })
export class QuestionnaireDto {
  @Field(_ => ID)
  id: number;

  @Field()
  title: string;

  static fromQuestionnaire(questionnaire: Questionnaire) {
    return {
      id: questionnaire.id,
      title: questionnaire.title,
    } as QuestionnaireDto;
  }
}
