import { Segmentationitem } from './segmentationitem';
import { prop, propObject, propArray } from "@rxweb/reactive-form-validators"

export class Segmentation {
@prop()
  segmentationId?:number;
@prop()
	segmentationName:String;

	segmentationitems:Segmentationitem[];

  constructor() {
  this.segmentationId = null;
  this.segmentationName = null;
  this.segmentationitems = [new Segmentationitem()];
}
}
