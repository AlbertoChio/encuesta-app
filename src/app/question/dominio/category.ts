import { prop, propArray, required, unique } from '@rxweb/reactive-form-validators';
import { Question } from './question';

export class Category {
  @prop()
  categoryId?: number;
  @unique()
  @required()
  categoryName?: String;
  @propArray(Question)
  questions?: Question[];

  constructor(data?) {
    if (data) {
      console.log(data)
      this.categoryId = data['categoryId'];
      this.categoryName = data['categoryName']
      this.questions = [new Question()]
    }
    else {
      this.categoryId = null;
      this.categoryName = null;
      this.questions = [new Question()]
    }

  }
}
