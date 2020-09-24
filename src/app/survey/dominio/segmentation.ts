import { Segmentationitem } from './segmentationitem';

export class Segmentation {
  segmentationId?:number;
	segmentationName:String;
	segmentationitems:Segmentationitem[];

  constructor(segmentationId:number, segmentationName:String, segmentationitems:Segmentationitem[]) {
  this.segmentationId = segmentationId;
  this.segmentationName = segmentationName;
  this.segmentationitems = segmentationitems;
}
}
