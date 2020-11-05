import { prop, propArray } from '@rxweb/reactive-form-validators';
import { Question } from './question';

export class Category {
    @prop()
  categoryId?:number;
    @prop()
  categoryName: String;
@propArray(Question)
  questions:Question[];

  constructor(){
    this.categoryId=null;
    this.categoryName=null;
    this.questions=[new Question()]
  }
}
