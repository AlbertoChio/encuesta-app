import { propArray } from '@rxweb/reactive-form-validators';
import { ApplicationHasQuestion } from './application-has-question';
import { Segmentationitem } from './segmentationitem';

export class Application {

  idapplication: number;

  @propArray(Segmentationitem)
  segmentationitems: Segmentationitem[];
  @propArray(ApplicationHasQuestion)
  applicationHasQuestions: ApplicationHasQuestion[];
  constructor() {
    this.idapplication = null;
    this.segmentationitems = [new Segmentationitem()]
    this.applicationHasQuestions = [new ApplicationHasQuestion()]
  }

}
