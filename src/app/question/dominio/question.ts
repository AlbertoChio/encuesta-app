import { Category } from './category';

export class Question {
 questionId?:number;
 questionAnswerRequired:Boolean;
 questionName:String;
 questionNumber:number;
 questionText:String;
 category: Category;

constructor(questionAnswerRequired: Boolean, questionName: String, questionNumber: number, questionText: String, questionCategory: Category) {
		this.questionAnswerRequired = questionAnswerRequired;
		this.questionName = questionName;
		this.questionNumber = questionNumber;
		this.questionText = questionText;
		this.category = questionCategory;
}
}
