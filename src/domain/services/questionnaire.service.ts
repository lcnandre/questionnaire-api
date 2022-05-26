import { Injectable } from '@nestjs/common';

import { Questionnaire } from '../entities/questionnaire';

@Injectable()
export class QuestionnaireService {
  getQuestionnaire(shareUrl: string): Promise<Questionnaire> {
    return Promise.resolve({} as Questionnaire);
  }
}
