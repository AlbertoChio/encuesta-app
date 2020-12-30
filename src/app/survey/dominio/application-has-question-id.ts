import { prop } from '@rxweb/reactive-form-validators';

export class ApplicationHasQuestionId {
  @prop()
  questionQuestionId: number;

  @prop()
  applicationIdapplication: number;

  constructor() {
    this.questionQuestionId = null;
    this.applicationIdapplication = null;
  }
}
