import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SurveyService } from '../../infraestructura/survey.service';
import { TokenService } from 'src/app/auth/infraestructura/token.service';
import { Survey } from '../../dominio/survey';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ApplicationHasSegmentationitem } from '../../dominio/application-has-segmentationitem';
import { RxFormBuilder, FormBuilderConfiguration } from '@rxweb/reactive-form-validators';
import { Segmentation } from '../../dominio/segmentation';
import { Segmentationitem } from '../../dominio/segmentationitem';
import { Question } from 'src/app/question/dominio/question';
import { Category } from 'src/app/question/dominio/category';
import { Application } from '../../dominio/application';
import { ApplicationHasQuestion } from '../../dominio/application-has-question';

@Component({
  selector: 'app-new-answer',
  templateUrl: './new-answer.component.html',
  styleUrls: ['./new-answer.component.css']
})
export class NewAnswerComponent implements OnInit {
  applicationg: FormGroup;
  survey: Survey;
  application: Application;
  constructor(
    private surveyService: SurveyService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private tokenService: TokenService,
    private formBuilder: RxFormBuilder
  ) {
    this.survey = new Survey()
    this.application = new Application();
    this.applicationg = this.formBuilder.formGroup(this.application);
  }

  ngOnInit() {
    this.cargarsurvey();
  }

  cargarsurvey() {
    const surveyname = this.activatedRoute.snapshot.params.surveyname;
    this.surveyService.surveyuserParticipantRequestSurvey(surveyname).subscribe(
      data => {
        this.survey = new Survey(data)
        this.cargarform();
      },
      err => {
        this.survey = null;
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['survey/lista']);
      }
    );
  }

  cargarform() {
    if (this.survey.surveyName) {
      let segmentations = <FormArray>this.applicationg.controls.segmentationitems;
      let questions = <FormArray>this.applicationg.controls.applicationHasQuestions;
      segmentations.removeAt(0);
      questions.removeAt(0);
      this.survey.segmentations.forEach((element, index) => {
        segmentations.push(this.formBuilder.formGroup(new Segmentationitem()));
        this.applicationg.controls.segmentationitems['controls'][index].controls.segmentationitemId.setValue(-1);
      });

      this.survey.categories.forEach((element, index) => {
        element.questions.forEach((elementt, indexx) => {

          let applicationHasQuestion = new ApplicationHasQuestion();

          applicationHasQuestion.id.questionQuestionId = elementt.questionId;
          applicationHasQuestion.applicationHasQuestionvalue = -1;
          questions.push(this.formBuilder.formGroup(applicationHasQuestion));
          //console.log(this.applicationg.controls.applicationHasQuestions['controls'][indexx].controls.id.controls.questionQuestionId.setValue(elementt.questionId))
        });
      });
    }
  }

  getformg(id: number): FormGroup {
    let indx: number;
    this.applicationg['controls']['applicationHasQuestions']['controls'].forEach((element, index) => {

      if (element['controls']['id']['controls']['questionQuestionId'].value == id) {
        indx = index;
        //console.log("ids iguales"+ element['controls']['id']['controls']['questionQuestionId'].value+" "+id+" index"+index+" index asignado "+indx+" length"+this.applicationg['controls']['applicationHasQuestions']['controls'].length)
      }

    });
    return this.applicationg['controls']['applicationHasQuestions']['controls'][indx];
  }

  que() {
    console.log(this.applicationg['controls']['applicationHasQuestions']['controls']);
  }

  onSubmit(customerData) {
    // Process checkout data here

    console.warn('Your order has been submitted', customerData);
    this.surveyService.surveyuserParticipantSubmitAsnwer(customerData, this.survey.surveyName).subscribe(
      data => {
        this.toastr.success('Aplicacion guardada correctamente ', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/survey/lista']);
      },
      err => {
        //this.survey = null;
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        console.log(err.error.message);

        this.router.navigate(['/']);
      }
    );
  }
}
