import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/aplicacion/login.component';
import { RegistroComponent } from './auth/aplicacion/registro.component';
import { IndexComponent } from './index/aplicacion/index.component';
import { ListaSurveyComponent } from './survey/aplicacion/lista-survey/lista-survey.component';
import { ProdGuardService as guard } from './auth/infraestructura/prod-guard.service';
import { NewAnswerComponent } from './survey/aplicacion/new-answer/new-answer.component';
import { ChartsComponent } from './survey/aplicacion/charts/charts.component'
import { NewSurveyComponent } from './survey/aplicacion/new-survey/new-survey.component';
import { ListaParticipationsComponent } from './survey/aplicacion/lista-participations/lista-participations.component';
import { ModSurveyComponent } from './survey/aplicacion/mod-survey/mod-survey.component';
import { AddUsuariosComponent } from './survey/aplicacion/usuario/add-usuarios/add-usuarios.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full'},
  { path: 'index', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent , canActivate: [guard], data: { expectedRol: ['admin']  } },
  { path: 'manage/users', component: AddUsuariosComponent , canActivate: [guard], data: { expectedRol: ['admin']  } },
  { path: 'survey/lista',component: ListaSurveyComponent, canActivate: [guard], data: { expectedRol: ['admin']  } },
  { path: 'survey/new-answer/:surveyname', component: NewAnswerComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']  } },
  { path: 'survey/dashboard/:surveyname', component: ChartsComponent, canActivate: [guard], data: { expectedRol: ['admin']  } },
  { path: 'survey/survey-creation', component: NewSurveyComponent, canActivate: [guard], data: { expectedRol: ['admin']  } },
  { path: 'survey/mod-survey-creation/:surveyname', component: ModSurveyComponent, canActivate: [guard], data: { expectedRol: ['admin']  } },
  { path: 'participaciones/lista', component: ListaParticipationsComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']  } },
  { path: '404', component: IndexComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
