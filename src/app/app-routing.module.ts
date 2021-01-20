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
import { NewSurveyUsersComponent } from './survey/aplicacion/new-survey/new-survey-users.component';

const routes: Routes = [
  { path: '', component: IndexComponent  },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'survey/lista', component: ListaSurveyComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']  } },
  { path: 'survey/newanswer/:surveyname', component: NewAnswerComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']  } },
  { path: 'survey/dashboard/:surveyname', component: ChartsComponent, canActivate: [guard], data: { expectedRol: ['admin']  } },
  { path: 'new-survey', component: NewSurveyComponent, canActivate: [guard], data: { expectedRol: ['admin']  } },
  { path: 'new-survey-users', component: NewSurveyUsersComponent, canActivate: [guard], data: { expectedRol: ['admin']  } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
