import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { QuestionnaireService } from '../../../domain/services/questionnaire.service';
import { QuestionnaireDto } from './dtos/questionnaire.dto';

@Resolver(QuestionnaireDto)
export class QuestionnaireResolver {
  constructor(private readonly service: QuestionnaireService) { }

  @Query(_ => QuestionnaireDto)
  async questionnaire(@Args('shareUrl') shareUrl: string): Promise<QuestionnaireDto> {
    const questionnaire = await this.service.getQuestionnaire(shareUrl);
    if (!questionnaire) {
      throw new NotFoundException(shareUrl);
    }
    return QuestionnaireDto.fromQuestionnaire(questionnaire);
  }
}
