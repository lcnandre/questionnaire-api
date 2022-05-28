import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Questionnaire } from '../../../domain/entities/questionnaire';

export class GetQuestionnaireQuery {
  constructor(public readonly shareUrl: string) { }
}

@QueryHandler(GetQuestionnaireQuery)
export class GetQuestionnaireHandler implements IQueryHandler<GetQuestionnaireQuery> {
  constructor(@InjectRepository(Questionnaire) private readonly repository: EntityRepository<Questionnaire>) { }

  execute(query: GetQuestionnaireQuery): Promise<Questionnaire> {
    const { shareUrl } = query;

    return this.repository.findOne({ shareUrl }, { populate: ['questions'] });
  }
}
