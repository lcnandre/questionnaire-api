import { NotFoundException, UseInterceptors } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CurrentUserInterceptor } from '../../../application/interceptors/current-user.interceptor';
import { CurrentUser } from '../../../application/decorators/current-user.decorator';
import { User } from '../../../domain/entities/user';
import { QuestionnaireService } from '../../../domain/services/questionnaire.service';
import { AddQuestionnaireDto } from './dtos/add-questionaire.dto';
import { QuestionnaireDto } from './dtos/questionnaire.dto';
import { UpdateQuestionnaireDto } from './dtos/update-questionnaire.dto';

@Resolver(QuestionnaireDto)
export class QuestionnaireResolver {
  constructor(private readonly service: QuestionnaireService) { }

  @Query(/* istanbul ignore next */_ => QuestionnaireDto)
  async questionnaire(
    @Args('shareUrl', { nullable: true }) shareUrl?: string,
    @Args('id', { nullable: true, type: /* istanbul ignore next */ () => Int }) id?: number): Promise<QuestionnaireDto>
  {
    const questionnaire = await this.service.getQuestionnaire(shareUrl, id);
    if (!questionnaire) {
      throw new NotFoundException(shareUrl);
    }
    return QuestionnaireDto.fromQuestionnaire(questionnaire);
  }

  @Mutation(/* istanbul ignore next */_ => QuestionnaireDto)
  @UseInterceptors(CurrentUserInterceptor)
  async addQuestionnaire(@CurrentUser() user: User, @Args('addQuestionnaireDto') dto: AddQuestionnaireDto) {
    const questionnaire = await this.service.createQuestionnaire(user, dto.title, dto.questions);
    return QuestionnaireDto.fromQuestionnaire(questionnaire);
  }

  @Mutation(/* istanbul ignore next */_ => QuestionnaireDto)
  async updateQuestionnaire(@Args('updateQuestionnaireDto') dto: UpdateQuestionnaireDto) {
    const questionnaire = await this.service.updateQuestionnaire(dto.id, dto.title, dto.questions);
    return QuestionnaireDto.fromQuestionnaire(questionnaire);
  }
}
