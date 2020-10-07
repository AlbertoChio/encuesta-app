import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SurveyService } from '../../infraestructura/survey.service';
import { TokenService } from 'src/app/auth/infraestructura/token.service';
import { Survey } from '../../dominio/survey';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NgSelectModule } from '@ng-select/ng-select';


@Component({
  selector: 'app-new-answer',
  templateUrl: './new-answer.component.html',
  styleUrls: ['./new-answer.component.css']
})
export class NewAnswerComponent implements OnInit {

  selectedCar: number;

     cars = [
         { id: 1, name: 'Volvo' },
         { id: 2, name: 'Saab' },
         { id: 3, name: 'Opel' },
         { id: 4, name: 'Audi' },
     ];


  testForm: FormGroup;
  segmentationitems: FormGroup;

  survey= new Survey("","","","","","","",null,null)

  constructor(
    private surveyService: SurveyService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private tokenService: TokenService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {

    console.log(this.segmentationitems)
    const surveyname = this.activatedRoute.snapshot.params.surveyname;
    this.surveyService.surveyuserParticipantRequestSurvey(surveyname).subscribe(
      data => {
      this.survey= new Survey(data['surveyDescription'],data['surveyExitMessage'],data['surveyExpirationDate'],data['surveyName'],data['surveyPublicationDate'],data['surveyStartDate'],data['surveyWelcomeMessage'],data['questions'],data['segmentations']);
      //this.segmentation=this.survey.segmentations
    //  console.log(JSON.stringify(this.survey.segmentations));
      console.log(this.survey.segmentations);

      if(this.survey.segmentations.length>0)
      this.survey.segmentations.forEach((myObject, index) =>
      console.log(myObject.segmentationName)
      );

      },
      err => {
        this.survey = null;
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
         //this.router.navigate(['/']);
      }
    );

    this.testForm = new FormGroup({
      segmentationitems: new FormArray([])
    });

    console.log(this.segmentationitems)
}

}
