import { Question } from 'src/app/question/dominio/question';
import { Segmentation } from './segmentation';
import { prop, propObject, propArray } from "@rxweb/reactive-form-validators"



export class Survey {
  @prop()
   surveyId?: number;

	 surveyDescription:String;

	 surveyExitMessage:String;

	 surveyExpirationDate:String;
   @prop()
	 surveyName:String;

	 surveyPublicationDate:String;

	 surveyStartDate:String;

	 surveyWelcomeMessage:String;

	 questions:Question[];
   @propArray(Segmentation)
   segmentations:Segmentation[];

  constructor() {
        this.surveyDescription = null;
        this.surveyExitMessage = null;
        this.surveyExpirationDate = null;
        this.surveyName = null;
        this.surveyPublicationDate = null;
        this.surveyStartDate = null;
        this.surveyWelcomeMessage = null;
        this.questions = [new Question()];
        this.segmentations = [new Segmentation()];
  }
}
