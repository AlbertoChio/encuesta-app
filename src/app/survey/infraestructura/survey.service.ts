import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from '../dominio/survey';


@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  surveyURL = 'http://localhost:8080/api/encuesta/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Survey[]> {
    return this.httpClient.get<Survey[]>(this.surveyURL);
  }

  public surveyuserParticipantRequestSurvey(surveyname: String): Observable<any> {
    return this.httpClient.get<any>(this.surveyURL + `answer/${surveyname}`);
  }
}
