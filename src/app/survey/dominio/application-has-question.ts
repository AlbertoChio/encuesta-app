import { prop, propObject, propArray } from "@rxweb/reactive-form-validators"
import { Question } from 'src/app/question/dominio/question';
import { ApplicationHasQuestionId } from './application-has-question-id';

export class ApplicationHasQuestion {

  @prop()
  id:ApplicationHasQuestionId ;

  @propArray(Question)
  question:Question;

  @prop()
  applicationHasQuestionvalue:String;

  constructor(){
    this.id=new ApplicationHasQuestionId();
    this.question=new Question();
    this.applicationHasQuestionvalue=null;
  }
}
