import { Segmentationitem } from './segmentationitem';
import { prop, propObject, propArray } from "@rxweb/reactive-form-validators"

export class Segmentation {
@prop()
  segmentationId?:number;
@prop()
	segmentationName:String;

	segmentationitems:Segmentationitem[];

  constructor(segmentationId:number, segmentationName:String, segmentationitems:Segmentationitem[]) {
  this.segmentationId = segmentationId;
  this.segmentationName = segmentationName;
  this.segmentationitems = segmentationitems;
}
}
