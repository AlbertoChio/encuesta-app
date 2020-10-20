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
import { RxFormBuilder,FormBuilderConfiguration } from '@rxweb/reactive-form-validators';
import { Segmentation } from '../../dominio/segmentation';
import { Segmentationitem } from '../../dominio/segmentationitem';
import { Question } from 'src/app/question/dominio/question';
import { Category } from 'src/app/question/dominio/category';
import { Application } from '../../dominio/application';

@Component({
  selector: 'app-new-answer',
  templateUrl: './new-answer.component.html',
  styleUrls: ['./new-answer.component.css']
})
export class NewAnswerComponent implements OnInit {
  applicationg : FormGroup;
  survey: Survey;
  application:Application;

  constructor(
    private surveyService: SurveyService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private tokenService: TokenService,
    private formBuilder: RxFormBuilder
  ) {
    this.survey= new Survey()
    //this.segmetationitem= new Segmentationitem();
    this.application= new Application();
    //this.segmentationitems.push(this.segmetationitem);
    //this.applicationHasSegmentationitem=new ApplicationHasSegmentationitem(null);
    //this.applicationHasSegmentationitem.segmentationitems= [new Segmentationitem()];
    //this.category=new Category();
    //this.question= new Question();
    //this.questions= [this.question]
    this.applicationg=this.formBuilder.formGroup(this.application);
  }

  ngOnInit() {
    const surveyname = this.activatedRoute.snapshot.params.surveyname;
    //this.applicationHasSegmentationitem.segmentationitems= [];
    //this.segmentationitemsg=this.formBuilder.formGroup(this.applicationHasSegmentationitem);
    this.surveyService.surveyuserParticipantRequestSurvey(surveyname).subscribe(
      data => {
      this.survey.surveyDescription=data['surveyDescription']
      this.survey.surveyExitMessage=data['surveyExitMessage']
      this.survey.surveyExpirationDate=data['surveyExpirationDate']
      this.survey.surveyName=data['surveyName']
      this.survey.surveyPublicationDate=data['surveyPublicationDate']
      this.survey.surveyStartDate=data['surveyStartDate']
      this.survey.surveyWelcomeMessage=data['surveyWelcomeMessage']
      this.survey.questions=data['questions']
      this.survey.segmentations=data['segmentations']

      //let segmentations = <FormArray>this.segmentationitemsg.controls.segmentationitems;
      //this.questions=this.survey.questions;
      this.survey.segmentations.forEach((element,index) => {
      //segmentations.push(this.formBuilder.formGroup(new Segmentationitem()));

      });

      },
      err => {
        this.survey = null;
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
         //this.router.navigate(['/']);
      }
    );

}
//let chilo = this.userFormGroup.controls.hobbies as FormArray;
//chilo.push(this.formBuilder.formGroup(Hobby));
que(){
  //console.log(this.survey);
  console.log(this.applicationg);
}

onSubmit(customerData) {
  // Process checkout data here

  console.warn('Your order has been submitted', customerData);
  this.surveyService.surveyuserParticipantSubmitAsnwer(customerData).subscribe(
    data => {
console.log(data);

    },
    err => {
      this.survey = null;
      this.toastr.error(err.error.mensaje, 'Fail', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
       //this.router.navigate(['/']);
    }
  );
}
}
