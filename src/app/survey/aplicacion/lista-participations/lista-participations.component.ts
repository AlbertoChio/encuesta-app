import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from '../../infraestructura/survey.service';
import { TokenService } from 'src/app/auth/infraestructura/token.service';
import { Surveyparticipant } from '../../dominio/surveyparticipant';

@Component({
  selector: 'app-lista-participations',
  templateUrl: './lista-participations.component.html',
  styleUrls: ['./lista-participations.component.css']
})
export class ListaParticipationsComponent implements OnInit {
  today = new Date();
  jstoday = '';
  surveyparticipants: Surveyparticipant[];
  roles: any[];
  isAdmin: boolean = false;
  titulo: string = "Mis Participaciones"
  constructor(
    private surveyService: SurveyService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {this.surveyparticipants = [new Surveyparticipant()]; }

  ngOnInit() {
    this.cargarSurveys();
    this.isAdmin = this.hasRole('ROLE_ADMIN')
  }

  cargarSurveys(): void {
        this.surveyService
            .lista()
            .subscribe(
              data => {
                this.surveyparticipants = data;
                console.log(data)
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
