import { prop, propObject, propArray, digit, range } from "@rxweb/reactive-form-validators"

export class Segmentationitem {

  @range({ minimumNumber: 0, maximumNumber: 60 })
  segmentationitemId?: number;
  @prop()
  segmentationitemName: String;

  constructor() {
    this.segmentationitemId = null;
    this.segmentationitemName = null;
  }
}
