import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/auth/infraestructura/token.service';
import { Category } from 'src/app/question/dominio/category';
import { Question } from 'src/app/question/dominio/question';
import { Segmentation } from '../../dominio/segmentation';
import { Segmentationitem } from '../../dominio/segmentationitem';
import { Survey } from '../../dominio/survey';
import { SurveyService } from '../../infraestructura/survey.service';
import { SessionStorageService } from '../../infraestructura/session-storage.service';



@Component({
  selector: 'app-new-survey',
  templateUrl: './new-survey.component.html',
   styleUrls: ['./new-survey.component.css']
})

export class NewSurveyComponent implements OnInit {

  surveyg: FormGroup;
  survey: Survey = new Survey();

  constructor(
    private surveyService: SurveyService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private tokenService: TokenService,
    private formBuilder: RxFormBuilder,
    private storage: SessionStorageService) {
      this.surveyg = this.formBuilder.formGroup(this.survey);
  }

     ngOnInit() {
      const storageValue = this.storage.getSurveyfg();
      if (storageValue) {
        this.surveyg = this.formBuilder.formGroup((new Survey(JSON.parse(storageValue))));
      }
       this.surveyg.valueChanges.subscribe(selectedValue  => {
         this.storage.setSurveyfg(selectedValue)
  })
}

  async onSubmit(content) {
    this.storage.clearSurveyfg();
this.surveyService.surveyadminsubmitSurveyNewSurveyDto(content).subscribe(
  data => {
    this.toastr.success(data.mensaje, 'OK', {
      timeOut: 3000, positionClass: 'toast-top-center'
    });
    this.router.navigate(['/']);
  },
  err => {
    this.surveyg = this.formBuilder.formGroup(this.survey);
    this.toastr.error(err.error.mensaje, 'Fail', {
      timeOut: 3000, positionClass: 'toast-top-center',
    });
      this.router.navigate(['/']);
  }
);
  }

  addCategory() {
    let categories = <FormArray>this.surveyg.controls.categories;
    categories.push(this.formBuilder.formGroup(new Category()));
  }

  removeCategory(i: number) {
    let categories = <FormArray>this.surveyg.controls.categories;
    categories.removeAt((i));
  }

  addQuestion(i: number) {
    let questions = <FormArray>this.surveyg.controls.categories['controls'][i]['controls']['questions'];
    questions.push(this.formBuilder.formGroup(new Question()));
  }

  removeQuestion(i1: number, i: number) {
    let questions = <FormArray>this.surveyg.controls.categories['controls'][i]['controls']['questions'];
    questions.removeAt((i1));
  }

  addSegmentation() {
    let segmentations = <FormArray>this.surveyg.controls.segmentations;
    segmentations.push(this.formBuilder.formGroup(new Segmentation()));
  }

  addSegmentationitem(i: number) {
    let items = <FormArray>this.surveyg.controls.segmentations['controls'][i]['controls']['segmentationitems'];
    items.push(this.formBuilder.formGroup(new Segmentationitem()));
  }

  removeSegmentation(i: number) {
    let segmentations = <FormArray>this.surveyg.controls.segmentations;
    segmentations.removeAt((i));
  }

  removeSegmentationitem(i1: number, i: number) {
    let items = <FormArray>this.surveyg.controls.segmentations['controls'][i]['controls']['segmentationitems'];
    items.removeAt((i1));
  }

que(){

}
}
