import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Questionnaire } from '../../entities/questionnaire';
import { QuestionVo } from '../../vos/question.vo';
import { QuestionFactory } from '../../factories/question.factory';

export class UpdateQuestionnaireCommand {
  constructor(
    public readonly questionnaire: Questionnaire,
    public readonly title?: string,
    public readonly questions?: QuestionVo[],
  ) { }
}

@CommandHandler(UpdateQuestionnaireCommand)
export class UpdateQuestionnaireHandler implements ICommandHandler<UpdateQuestionnaireCommand> {
  constructor(@InjectRepository(Questionnaire) private readonly repository: EntityRepository<Questionnaire>) { }

  async execute(command: UpdateQuestionnaireCommand): Promise<Questionnaire> {
    const { questionnaire, title, questions } = command;

    if (title) {
      questionnaire.title = title;
    }

    if (questions && questions.length) {
      questionnaire.questions.set(questions.map(q => QuestionFactory.fromVo(q)));
    }

    if (title || (questions && questions.length)) {
      await this.repository.persistAndFlush(questionnaire);
    }

    return questionnaire;
  }
}
