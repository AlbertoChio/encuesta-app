import { prop } from '@rxweb/reactive-form-validators';

export class Category {
    @prop()
  categoryId?:number;
    @prop()
  categoryName: String;

  constructor(categoryId:number,categoryName:String){
    this.categoryId=categoryId;
    this.categoryName=categoryName;
  }
}
