import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SurveyService } from '../../infraestructura/survey.service';
import { TokenService } from 'src/app/auth/infraestructura/token.service';
import { Survey } from '../../dominio/survey';


@Component({
  selector: 'app-new-answer',
  templateUrl: './new-answer.component.html',
  styleUrls: ['./new-answer.component.css']
})
export class NewAnswerComponent implements OnInit {
  objectKeys = Object.keys;
  survey: any;

  constructor(
    private surveyService: SurveyService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private tokenService: TokenService,
  ) { }

  ngOnInit() {
    const surveyname = this.activatedRoute.snapshot.params.surveyname;
    this.surveyService.surveyuserParticipantRequestSurvey(surveyname).subscribe(
      data => {
        this.survey= new Survey(data['surveyDescription'],data['surveyExitMessage'],data['surveyExpirationDate'],data['surveyName'],data['surveyPublicationDate'],data['surveyStartDate'],data['surveyWelcomeMessage'],data['questions'],data['segmentations']);
        console.log(this.survey.segmentations)

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
