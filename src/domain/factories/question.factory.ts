import { ShortAnswerQuestion } from '../entities/questions/short-answer-question';
import { QuestionType } from '../enums/question-type';
import { QuestionVo } from '../vos/question.vo';

export class QuestionFactory {
  static fromVo(vo: QuestionVo) {
    switch (vo.type) {
      case QuestionType.ShortAnswer:
        return new ShortAnswerQuestion(vo.order, vo.title, vo.id);
    }
  }
}
