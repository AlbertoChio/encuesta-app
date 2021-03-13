import { prop, propObject, propArray, digit, range, required } from "@rxweb/reactive-form-validators"

export class Segmentationitem {

  @range({ minimumNumber: 0, maximumNumber: 1000000 })
  segmentationitemId?: number;
  @required()
  segmentationitemName: String;
  @prop()
  segmentationitemNumber:number;

  constructor() {
    this.segmentationitemId = null;
    this.segmentationitemName = null;
    this.segmentationitemNumber = 0;
  }
}
