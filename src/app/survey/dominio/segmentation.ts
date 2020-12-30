import { Segmentationitem } from './segmentationitem';
import { prop, propObject, propArray } from "@rxweb/reactive-form-validators"

export class Segmentation {
  @prop()
  segmentationId?: number;
  @prop()
  segmentationName?: String;

  segmentationitems?: Segmentationitem[];

  constructor(data?) {
    if (data) {
      console.log(data)
      this.segmentationId = data['segmentationId'];
      console.log(this.segmentationId)
      this.segmentationName = data['segmentationName'];
      this.segmentationitems = [new Segmentationitem()];
    }
    else {
      this.segmentationId = null;
      this.segmentationName = null;
      this.segmentationitems = [new Segmentationitem()];
    }

  }
}
