import { Question } from 'src/app/question/dominio/question';
import { Segmentation } from './segmentation';



export class Survey {
   surveyId?: number;
	 surveyDescription:String;
	 surveyExitMessage:String;
	 surveyExpirationDate:String;
	 surveyName:String;
	 surveyPublicationDate:String;
	 surveyStartDate:String;
	 surveyWelcomeMessage:String;
	 questions:Question[];
   segmentations:Segmentation[];

  constructor(surveyDescription:String,surveyExitMessage: String, surveyExpirationDate: String,
      surveyName: String, surveyPublicationDate: String, surveyStartDate:String, surveyWelcomeMessage:String,
      questions:Question[],segmentations:Segmentation[]) {
        this.surveyDescription = surveyDescription;
        this.surveyExitMessage = surveyExitMessage;
        this.surveyExpirationDate = surveyExpirationDate;
        this.surveyName = surveyName;
        this.surveyPublicationDate = surveyPublicationDate;
        this.surveyStartDate = surveyStartDate;
        this.surveyWelcomeMessage = surveyWelcomeMessage;
        this.questions = questions;
        this.segmentations = segmentations;
  }
}
