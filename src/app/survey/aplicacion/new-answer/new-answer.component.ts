import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SurveyService } from '../../infraestructura/survey.service';
import { TokenService } from 'src/app/auth/infraestructura/token.service';
import { Survey } from '../../dominio/survey';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { SurveyparticipantHasSegmentationitem } from '../../dominio/surveyparticipant-has-segmentationitem';
import { RxFormBuilder,FormBuilderConfiguration } from '@rxweb/reactive-form-validators';
import { Segmentation } from '../../dominio/segmentation';
import { Segmentationitem } from '../../dominio/segmentationitem';
import { Question } from 'src/app/question/dominio/question';
import { Category } from 'src/app/question/dominio/category';

@Component({
  selector: 'app-new-answer',
  templateUrl: './new-answer.component.html',
  styleUrls: ['./new-answer.component.css']
})
export class NewAnswerComponent implements OnInit {
  segmentationitemsg : FormGroup;
  survey: Survey;
  surveyparticipantHasSegmentationitem:SurveyparticipantHasSegmentationitem;
  segmentationitems: Segmentationitem[]=[];
  segmetationitem:Segmentationitem;
  questions:Question[];
  question:Question;
  category:Category;

  constructor(
    private surveyService: SurveyService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private tokenService: TokenService,
    private formBuilder: RxFormBuilder
  ) {
    this.survey= new Survey("","","","","","","",null,null)
    this.segmetationitem= new Segmentationitem(null,null);
    this.segmentationitems.push(this.segmetationitem);
    this.surveyparticipantHasSegmentationitem=new SurveyparticipantHasSegmentationitem(null);
    this.surveyparticipantHasSegmentationitem.segmentationitems= [new Segmentationitem(null,null)];
    this.category=new Category(null,null);
    this.question= new Question(true,null,null,null,null);
    this.questions= [this.question]
    this.segmentationitemsg=this.formBuilder.formGroup(this.surveyparticipantHasSegmentationitem);
  }

  ngOnInit() {
    const surveyname = this.activatedRoute.snapshot.params.surveyname;
    this.surveyparticipantHasSegmentationitem.segmentationitems= [];
    this.segmentationitemsg=this.formBuilder.formGroup(this.surveyparticipantHasSegmentationitem);
    this.surveyService.surveyuserParticipantRequestSurvey(surveyname).subscribe(
      data => {
      this.survey= new Survey(data['surveyDescription'],data['surveyExitMessage'],data['surveyExpirationDate'],data['surveyName'],data['surveyPublicationDate'],data['surveyStartDate'],data['surveyWelcomeMessage'],data['questions'],data['segmentations']);
      let segmentations = <FormArray>this.segmentationitemsg.controls.segmentationitems;
      this.questions=this.survey.questions;
      this.survey.segmentations.forEach((element,index) => {
      segmentations.push(this.formBuilder.formGroup(new Segmentationitem(-1,null)));

      });
      segmentations.push(this.formBuilder.formGroup(this.questions));
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
  console.log(this.segmentationitemsg);
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
