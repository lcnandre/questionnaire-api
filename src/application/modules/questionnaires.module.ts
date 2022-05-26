import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { Answer } from '../../domain/entities/answer';
import { ShortAnswer } from '../../domain/entities/answers/short-answer';
import { Question } from '../../domain/entities/question';
import { Questionnaire } from '../../domain/entities/questionnaire';
import { ShortAnswerQuestion } from '../../domain/entities/questions/short-answer-question';
import { QuestionnaireService } from '../../domain/services/questionnaire.service';
import { QuestionnaireResolver } from '../../io/resolvers/questionnaires/dtos/questionnaire.resolver';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [Questionnaire, Question, Answer, ShortAnswer, ShortAnswerQuestion]
    }),
  ],
  providers: [QuestionnaireResolver, QuestionnaireService,],
})
export class QuestionnairesModule { }
