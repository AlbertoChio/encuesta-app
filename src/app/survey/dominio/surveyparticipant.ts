import { Application } from './application';
import { Survey } from './survey';

export class Surveyparticipant {

  surveyparticipantId?:number;

  survey?:Survey;

  applications?:Application[];

constructor(data?){
  if(data){
    this.surveyparticipantId=null;
    this.survey= new Survey(data.survey);
    this.applications= [new Application()]
  }
  else{
    this.surveyparticipantId=null;
    this.survey= new Survey();
    this.applications= [new Application()]
  }
}
}
