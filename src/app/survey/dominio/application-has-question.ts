import { prop, propObject, propArray, range } from "@rxweb/reactive-form-validators"
import { Question } from 'src/app/question/dominio/question';
import { ApplicationHasQuestionId } from './application-has-question-id';

export class ApplicationHasQuestion {


  id: ApplicationHasQuestionId;

@propObject(Question)
  question: Question;

  @range({ minimumNumber: 1, maximumNumber: 5 })
  applicationHasQuestionvalue?: number;

  constructor() {
    this.id = new ApplicationHasQuestionId();
    this.question = new Question();
    this.applicationHasQuestionvalue = null;
  }
}
