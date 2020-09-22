import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Survey } from '../../dominio/survey';
import { SurveyService } from '../../infraestructura/survey.service';
import { TokenService } from 'src/app/auth/infraestructura/token.service';


@Component({
  selector: 'app-lista-survey',
  templateUrl: './lista-survey.component.html',
  styleUrls: ['./lista-survey.component.css']
})
export class ListaSurveyComponent implements OnInit {
  today= new Date();
  jstoday = '';
  surveys: Survey[] = [];
  roles: any[];
  constructor(
    private surveyService: SurveyService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

 }

  ngOnInit() {
    this.cargarSurveys();
  }

  cargarSurveys(): void {
    this.surveyService.lista().subscribe(
      data => {
        this.surveys = data;
      },
      err => {
        this.surveys = null;
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
