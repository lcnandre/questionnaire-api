import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { Questionnaire } from '../entities/questionnaire';
import { GetQuestionnaireQuery } from '../use-cases/questionnaire/get-questionnaire';

@Injectable()
export class QuestionnaireService {
  constructor(private readonly queryBus: QueryBus) { }

  getQuestionnaire(shareUrl: string): Promise<Questionnaire> {
    return this.queryBus.execute(
      new GetQuestionnaireQuery(shareUrl)
    );
  }
}
