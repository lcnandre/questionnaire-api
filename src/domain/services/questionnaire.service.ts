import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { Questionnaire } from '../entities/questionnaire';
import { User } from '../entities/user';
import { CreateQuestionnaireCommand } from '../use-cases/questionnaire/create-questionnaire';
import { GetQuestionnaireQuery } from '../use-cases/questionnaire/get-questionnaire';
import { QuestionVo } from '../vos/question.vo';

@Injectable()
export class QuestionnaireService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  getQuestionnaire(shareUrl: string): Promise<Questionnaire> {
    return this.queryBus.execute(
      new GetQuestionnaireQuery(shareUrl)
    );
  }

  createQuestionnaire(user: User, title: string, questions: QuestionVo[]) {
    return this.commandBus.execute(
      new CreateQuestionnaireCommand(user, title, questions)
    );
  }
}
