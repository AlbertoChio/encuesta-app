import { prop, propObject, propArray, digit, range, required } from "@rxweb/reactive-form-validators"

export class Segmentationitem {

  @range({ minimumNumber: 0, maximumNumber: 60 })
  segmentationitemId?: number;
  @required()
  segmentationitemName: String;

  constructor() {
    this.segmentationitemId = null;
    this.segmentationitemName = null;
  }
}
