import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '../../../application/decorators/current-user.decorator';
import { User } from '../../../domain/entities/user';
import { QuestionnaireService } from '../../../domain/services/questionnaire.service';
import { AddQuestionnaireDto } from './dtos/add-questionaire.dto';
import { QuestionnaireDto } from './dtos/questionnaire.dto';

@Resolver(QuestionnaireDto)
export class QuestionnaireResolver {
  constructor(private readonly service: QuestionnaireService) { }

  @Query(/* istanbul ignore next */_ => QuestionnaireDto)
  async questionnaire(@Args('shareUrl') shareUrl: string): Promise<QuestionnaireDto> {
    const questionnaire = await this.service.getQuestionnaire(shareUrl);
    if (!questionnaire) {
      throw new NotFoundException(shareUrl);
    }
    return QuestionnaireDto.fromQuestionnaire(questionnaire);
  }

  @Mutation(/* istanbul ignore next */_ => QuestionnaireDto)
  async addQuestionnaire(@CurrentUser() user: User, @Args('addQuestionnaireDto') dto: AddQuestionnaireDto) {
    const questionnaire = await this.service.createQuestionnaire(user, dto.title, dto.questions);
    return QuestionnaireDto.fromQuestionnaire(questionnaire);
  }
}
