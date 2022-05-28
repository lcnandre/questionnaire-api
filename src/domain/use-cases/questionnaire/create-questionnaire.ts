import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { validate } from 'class-validator';

import { Questionnaire } from '../../entities/questionnaire';
import { QuestionVo } from '../../vos/question.vo';
import { User } from '../../entities/user';
import { QuestionFactory } from '../../factories/question.factory';

export class CreateQuestionnaireCommand {
  constructor(
    public readonly user: User,
    public readonly title: string,
    public readonly questions: QuestionVo[],
  ) { }
}

@CommandHandler(CreateQuestionnaireCommand)
export class CreateQuestionnaireHandler implements ICommandHandler<CreateQuestionnaireCommand> {
  constructor(@InjectRepository(Questionnaire) private readonly repository: EntityRepository<Questionnaire>) { }

  async execute(command: CreateQuestionnaireCommand): Promise<Questionnaire> {
    const { user, title, questions } = command;
    const questionnaire = new Questionnaire(
      user,
      title,
      questions?.map(q => QuestionFactory.fromVo(q))
    );
    const errors = await validate(questionnaire);

    if (errors && errors.length) {
      throw new BadRequestException(errors.join(','));
    }

    await this.repository.persistAndFlush(questionnaire);
    return questionnaire;
  }
}
