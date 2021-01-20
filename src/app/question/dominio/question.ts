import { prop, required } from '@rxweb/reactive-form-validators';
import { Category } from './category';

export class Question {
  @prop()
  questionId?: number;
  @prop()
  questionAnswerRequired: Boolean;
  @required()
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
