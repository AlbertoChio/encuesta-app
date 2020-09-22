import { Question } from 'src/app/question/dominio/question';



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

  constructor(surveyDescription:String,surveyExitMessage: String, surveyExpirationDate: String,
      surveyName: String, surveyPublicationDate: String, surveyStartDate:String, surveyWelcomeMessage:String,
      questions:Question[]) {
        this.surveyDescription = surveyDescription;
        this.surveyExitMessage = surveyExitMessage;
        this.surveyExpirationDate = surveyExpirationDate;
        this.surveyName = surveyName;
        this.surveyPublicationDate = surveyPublicationDate;
        this.surveyStartDate = surveyStartDate;
        this.surveyWelcomeMessage = surveyWelcomeMessage;
        this.questions = questions;
  }
}
