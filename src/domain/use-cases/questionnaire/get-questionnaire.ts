import { EntityRepository, FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Questionnaire } from '../../../domain/entities/questionnaire';

export class GetQuestionnaireQuery {
  constructor(
    public readonly shareUrl?: string,
    public readonly id?: number,
  ) { }
}

@QueryHandler(GetQuestionnaireQuery)
export class GetQuestionnaireHandler implements IQueryHandler<GetQuestionnaireQuery> {
  constructor(@InjectRepository(Questionnaire) private readonly repository: EntityRepository<Questionnaire>) { }

  execute(query: GetQuestionnaireQuery): Promise<Questionnaire> {
    const { shareUrl, id } = query;
    const filter: FilterQuery<Questionnaire> = {};

    if (shareUrl) filter.shareUrl = shareUrl;
    if (id) filter.id = id;

    return this.repository.findOne(filter, { populate: ['questions'] });
  }
}
