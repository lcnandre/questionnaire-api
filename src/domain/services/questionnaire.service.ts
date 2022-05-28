import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { Questionnaire } from '../entities/questionnaire';
import { User } from '../entities/user';
import { CreateQuestionnaireCommand } from '../use-cases/questionnaire/create-questionnaire';
import { GetQuestionnaireQuery } from '../use-cases/questionnaire/get-questionnaire';
import { UpdateQuestionnaireCommand } from '../use-cases/questionnaire/update-questionnaire';
import { QuestionVo } from '../vos/question.vo';

@Injectable()
export class QuestionnaireService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  getQuestionnaire(shareUrl?: string, id?: number): Promise<Questionnaire> {
    return this.queryBus.execute(
      new GetQuestionnaireQuery(shareUrl, id)
    );
  }

  createQuestionnaire(user: User, title: string, questions: QuestionVo[]) {
    return this.commandBus.execute(
      new CreateQuestionnaireCommand(user, title, questions)
    );
  }

  async updateQuestionnaire(id: number, title?: string, questions?: QuestionVo[]) {
    const questionnaire = await this.getQuestionnaire(undefined, id);
    return this.commandBus.execute(
      new UpdateQuestionnaireCommand(questionnaire, title, questions)
    );
  }
}
