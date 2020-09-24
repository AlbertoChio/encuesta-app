export class Segmentationitem {

  segmentationitemId?:number;
  segmentationitemName:String;

  constructor(segmentationitemId:number,segmentationitemName:String){
    this.segmentationitemId=segmentationitemId;
    this.segmentationitemName=segmentationitemName
  }
}
