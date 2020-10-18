import { Survey } from './survey';

export class Surveyparticipant {

  surveyparticipantId:number;

  survey:Survey;

constructor(surveyparticipantId:number,survey:Survey){
  this.surveyparticipantId=surveyparticipantId;
  this.survey=survey;
}
}
