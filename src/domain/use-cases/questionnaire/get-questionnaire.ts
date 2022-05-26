import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';

import { Questionnaire } from '../../../domain/entities/questionnaire';

export class GetQuestionnaireQuery {
  constructor(public readonly shareUrl: string) { }
}

@QueryHandler(GetQuestionnaireQuery)
export class GetQuestionnaireHandler implements ICommandHandler<GetQuestionnaireQuery> {
  constructor(@InjectRepository(Questionnaire) private readonly repository: EntityRepository<Questionnaire>) { }

  execute(command: GetQuestionnaireQuery): Promise<Questionnaire> {
    const { shareUrl } = command;

    return this.repository.findOne({ shareUrl });
  }
}
