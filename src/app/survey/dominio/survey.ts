import { Question } from 'src/app/question/dominio/question';
import { Segmentation } from './segmentation';
import { prop, propObject, propArray, required } from "@rxweb/reactive-form-validators"
import { Category } from 'src/app/question/dominio/category';
import { catchError, map } from "rxjs/operators";
import { Surveyparticipant } from './surveyparticipant';


export class Survey {
  @prop()
  surveyId?: number;
  @required()
  surveyDescription?: String;

  surveyExitMessage?: String;

  @required()
  surveyExpirationDate?: String;
  @required()
  surveyName?: String;

  surveyPublicationDate?: String;
  @required()
  surveyStartDate?: String;

  surveyWelcomeMessage?: String;
  @propArray(Category)
  categories?: Category[];

  @propArray(Segmentation)
  segmentations?: Segmentation[];

  @prop()
  surveyparticipants?: Surveyparticipant[];

  constructor(data?) {
    if (data) {
      if(data.surveyparticipants){
        this.surveyparticipants=data.surveyparticipants;
      }
      this.surveyId=data.surveyId;
      this.surveyDescription = data.surveyDescription;
      this.surveyExitMessage = data.surveyExitMessage;
      this.surveyExpirationDate = data.surveyExpirationDate;
      this.surveyName = data.surveyName;
      this.surveyPublicationDate = data.surveyPublicationDate;
      this.surveyStartDate = data.surveyStartDate;
      this.surveyWelcomeMessage = data.surveyWelcomeMessage;
      this.categories = data.categories;


      this.categories = data.categories.sort((a, b) =>  {if (a.categoryId < b.categoryId) {return -1;}if (a.categoryId>b.categoryId){return 1;}})

      this.categories.forEach(element => {
      element.questions=element.questions.sort((a, b) =>  {if (a.questionNumber < b.questionNumber) {return -1;}if (a.questionNumber>b.questionNumber){return 1;}})
      });
      
      this.segmentations =data.segmentations;

      data.segmentations=data.segmentations.sort((a, b) =>  {if (a.segmentationId < b.segmentationId) {return -1;}if (a.segmentationId>b.segmentationId){return 1;}})
      this.segmentations.forEach(element => {
      element.segmentationitems=element.segmentationitems.sort((a, b) =>  {if (a.segmentationitemNumber < b.segmentationitemNumber) {return -1;}if (a.segmentationitemNumber>b.segmentationitemNumber){return 1;}})
      });


 }
    else {
      this.surveyDescription = null;
      this.surveyExitMessage = null;
      this.surveyExpirationDate = null;
      this.surveyName = null;
      this.surveyPublicationDate = null;
      this.surveyStartDate = null;
      this.surveyWelcomeMessage = null;
      this.categories = [new Category()];
      this.segmentations = [new Segmentation()];
    }
  }
}
