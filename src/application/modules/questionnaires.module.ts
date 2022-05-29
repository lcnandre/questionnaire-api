import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { Answer } from '../../domain/entities/answer';
import { ShortAnswer } from '../../domain/entities/answers/short-answer';
import { User } from '../../domain/entities/user';
import { Question } from '../../domain/entities/question';
import { Questionnaire } from '../../domain/entities/questionnaire';
import { ShortAnswerQuestion } from '../../domain/entities/questions/short-answer-question';
import { QuestionnaireService } from '../../domain/services/questionnaire.service';
import { QuestionnaireResolver } from '../../io/resolvers/questionnaires/questionnaire.resolver';
import { GetQuestionnaireHandler } from '../../domain/use-cases/questionnaire/get-questionnaire';
import { CreateQuestionnaireHandler } from '../../domain/use-cases/questionnaire/create-questionnaire';
import { UpdateQuestionnaireHandler } from '../../domain/use-cases/questionnaire/update-questionnaire';

@Module({
  imports: [
    CqrsModule,
    MikroOrmModule.forFeature({
      entities: [Questionnaire, Question, Answer, ShortAnswer, ShortAnswerQuestion, User]
    }),
  ],
  providers: [
    QuestionnaireResolver,
    QuestionnaireService,
    GetQuestionnaireHandler,
    CreateQuestionnaireHandler,
    UpdateQuestionnaireHandler,
  ],
  exports: [CqrsModule],
})
export class QuestionnairesModule { }
