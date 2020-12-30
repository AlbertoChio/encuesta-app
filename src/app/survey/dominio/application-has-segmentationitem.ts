import { Segmentationitem } from './segmentationitem';
import { prop, propObject, propArray } from "@rxweb/reactive-form-validators"
import { Question } from 'src/app/question/dominio/question';


export class ApplicationHasSegmentationitem {

  surveyparticipantId: number;

  @propArray(Segmentationitem)
  segmentationitems: Segmentationitem[];

  constructor(segmentationitems: Segmentationitem[]) {
    this.surveyparticipantId = null;
    this.segmentationitems = segmentationitems;
  }
}
