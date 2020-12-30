import { prop } from '@rxweb/reactive-form-validators';
import { Category } from './category';

export class Question {
  @prop()
  questionId?: number;
  @prop()
  questionAnswerRequired: Boolean;
  @prop()
  questionName: String;
  @prop()
  questionNumber: number;
  @prop()
  questionText: String;


  constructor() {
    this.questionAnswerRequired = null;
    this.questionName = null;
    this.questionNumber = null;
    this.questionText = null;
  }
}
