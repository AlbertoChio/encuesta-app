import { prop } from '@rxweb/reactive-form-validators';

export class Category {
    @prop()
  categoryId?:number;
    @prop()
  categoryName: String;

  constructor(){
    this.categoryId=null;
    this.categoryName=null;
  }
}
