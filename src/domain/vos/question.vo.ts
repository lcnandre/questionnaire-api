import { QuestionType } from '../enums/question-type';

export class QuestionVo {
  order!: number;
  title!: string;
  type!: QuestionType;

  constructor(order: number, title: string, type: QuestionType) {
    this.order = order;
    this.title = title;
    this.type = type;
  }
}
