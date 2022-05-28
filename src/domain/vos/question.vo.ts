import { Question } from '../entities/question';
import { QuestionType } from '../enums/question-type';

export class QuestionVo {
  id?: number;
  order!: number;
  title!: string;
  type!: QuestionType;

  constructor(order: number, title: string, type: QuestionType, id?: number) {
    this.id = id;
    this.order = order;
    this.title = title;
    this.type = type;
  }

  static fromQuestion(question: Question): QuestionVo {
    return new QuestionVo(
      question.order,
      question.title,
      question.type,
      question.id,
    );
  }
}
