import { prop } from '@rxweb/reactive-form-validators';
import { Category } from './category';

export class Question {
    @prop()
 questionId?:number;
   @prop()
 questionAnswerRequired:Boolean;
   @prop()
 questionName:String;
   @prop()
 questionNumber:number;
   @prop()
 questionText:String;
   @prop()
 category: Category;

constructor(questionAnswerRequired: Boolean, questionName: String, questionNumber: number, questionText: String, questionCategory: Category) {
		this.questionAnswerRequired = questionAnswerRequired;
		this.questionName = questionName;
		this.questionNumber = questionNumber;
		this.questionText = questionText;
		this.category = questionCategory;
}
}
