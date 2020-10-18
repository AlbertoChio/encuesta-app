import { Segmentationitem } from './segmentationitem';
import { prop, propObject, propArray } from "@rxweb/reactive-form-validators"
import { Question } from 'src/app/question/dominio/question';


export class SurveyparticipantHasSegmentationitem {

  surveyparticipantId:number;

  @propArray(Segmentationitem)
  segmentationitems:Segmentationitem[];
  @propArray(Question)
  applicationHasQuestions:Question[];


constructor(segmentationitems :Segmentationitem[],questions:Question[]){
this.surveyparticipantId=null;
  this.segmentationitems=segmentationitems;
  this.applicationHasQuestions=questions;
}
}
