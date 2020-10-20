import { Application } from './application';
import { Survey } from './survey';

export class Surveyparticipant {

  surveyparticipantId:number;

  survey:Survey;

  applications:Application[];

constructor(){
  this.surveyparticipantId=null;
  this.survey= new Survey();
  this.applications= [new Application()]
}
}
