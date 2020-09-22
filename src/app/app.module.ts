import { BrowserModule } from '@angular/platform-browser';
import { NgModule,LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/aplicacion/login.component';
import { RegistroComponent } from './auth/aplicacion/registro.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu/aplicacion/menu.component';
import { IndexComponent } from './index/aplicacion/index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { interceptorProvider } from './util/prod-interceptor.service';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListaSurveyComponent } from './survey/aplicacion/lista-survey/lista-survey.component';
import { NewAnswerComponent } from './survey/aplicacion/new-answer/new-answer.component';


registerLocaleData(localeES, 'es');


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    MenuComponent,
    IndexComponent,
    ListaSurveyComponent,
    NewAnswerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [interceptorProvider,{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
