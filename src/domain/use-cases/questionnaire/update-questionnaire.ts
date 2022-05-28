import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Questionnaire } from '../../entities/questionnaire';
import { Question } from '../../../domain/entities/question';
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
      questionnaire.questions.remove(...this.getQuestionsToRemove(questionnaire, questions));
      questionnaire.questions.add(...this.getQuestionsToAdd(questions));
      this.updateQuestions(questionnaire, questions);
    }

    if (title || (questions && questions.length)) {
      await this.repository.persistAndFlush(questionnaire);
    }

    return questionnaire;
  }

  private getQuestionsToRemove(questionnaire: Questionnaire, vos: QuestionVo[]): Question[] {
    return questionnaire.questions.getItems().filter((q => !vos.find(v => v.id === q.id)));
  }

  private getQuestionsToAdd(vos: QuestionVo[]): Question[] {
    return vos.filter((v => !v.id)).map(v => QuestionFactory.fromVo(v));
  }

  private updateQuestions(questionnaire: Questionnaire, vos: QuestionVo[]): void {
    for (const vo of vos) {
      const question = questionnaire.questions.getItems().find(q => q.id === vo.id);

      if (question) {
        wrap(question).assign(vo);
      }
    }
  }
}
