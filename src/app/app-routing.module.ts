import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/aplicacion/login.component';
import { RegistroComponent } from './auth/aplicacion/registro.component';
import { IndexComponent } from './index/aplicacion/index.component';
import { ListaSurveyComponent } from './survey/aplicacion/lista-survey/lista-survey.component';
import { ProdGuardService as guard } from './auth/infraestructura/prod-guard.service';
import { NewAnswerComponent } from './survey/aplicacion/new-answer/new-answer.component';
import { ChartsComponent } from './survey/aplicacion/charts/charts.component'

const routes: Routes = [
  { path: '', component: IndexComponent  },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'survey/lista', component: ListaSurveyComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']  } },
  { path: 'surveynewanswer/:surveyname', component: NewAnswerComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user']  } },
  { path: 'survey/graficos/:surveyname', component: ChartsComponent, canActivate: [guard], data: { expectedRol: ['admin']  } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
