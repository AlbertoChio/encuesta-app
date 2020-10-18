import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Survey } from '../../dominio/survey';
import { SurveyService } from '../../infraestructura/survey.service';
import { TokenService } from 'src/app/auth/infraestructura/token.service';
import { Surveyparticipant } from '../../dominio/surveyparticipant';

@Component({
  selector: 'app-lista-survey',
  templateUrl: './lista-survey.component.html',
  styleUrls: ['./lista-survey.component.css']
})

export class ListaSurveyComponent implements OnInit {
  today= new Date();
  jstoday = '';
  surveyparticipants:Surveyparticipant[];
  surveyparticipant:Surveyparticipant;
  survey: Survey;
  roles: any[];
  constructor(
    private surveyService: SurveyService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.survey= new Survey("","","","","","","",null,null)
    this.surveyparticipant= new Surveyparticipant(null,this.survey)
    this.surveyparticipants=[this.surveyparticipant];
 }

  ngOnInit() {
    this.cargarSurveys();
  }

  cargarSurveys(): void {
    this.surveyService
        .lista()
        .subscribe(
          data => {
            console.log(data);
            this.surveyparticipants = data;
            console.log(this.surveyparticipants)
          },
          err => {
            this.surveyparticipants = null;
            console.log(err);
          }
        );
  }

  hasRole(role: string): boolean {
    this.roles = this.tokenService.getAuthorities();
    if (this.roles.includes(role)) {
      console.log(this.roles);
      return true;
    }
    return false;
  }
}
