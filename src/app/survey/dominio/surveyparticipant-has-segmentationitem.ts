import { Segmentationitem } from './segmentationitem';
import { prop, propObject, propArray } from "@rxweb/reactive-form-validators"


export class SurveyparticipantHasSegmentationitem {

  @propObject(Segmentationitem)
  segmentationitems:Segmentationitem[];

}
