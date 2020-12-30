import { Question } from 'src/app/question/dominio/question';
import { Segmentation } from './segmentation';
import { prop, propObject, propArray } from "@rxweb/reactive-form-validators"
import { Category } from 'src/app/question/dominio/category';
import { catchError, map } from "rxjs/operators";


export class Survey {
  @prop()
  surveyId?: number;

  surveyDescription?: String;

  surveyExitMessage?: String;

  surveyExpirationDate?: String;
  @prop()
  surveyName?: String;

  surveyPublicationDate?: String;

  surveyStartDate?: String;

  surveyWelcomeMessage?: String;

  categories?: Category[];

  @propArray(Segmentation)
  segmentations?: Segmentation[];

  constructor(data?) {
    if (data) {
      this.surveyDescription = data.surveyDescription;
      this.surveyExitMessage = data.surveyExitMessage;
      this.surveyExpirationDate = data.surveyExpirationDate;
      this.surveyName = data.surveyName;
      this.surveyPublicationDate = data.surveyPublicationDate;
      this.surveyStartDate = data.surveyStartDate;
      this.surveyWelcomeMessage = data.surveyWelcomeMessage;
      this.categories = data.categories
      this.segmentations = data.segmentations
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
  /**
* Creates an instance of documenter.
public constructor(data?:Survey){

}
*/

}
