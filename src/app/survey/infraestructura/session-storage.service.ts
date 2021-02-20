import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Survey } from '../dominio/survey';

const SURVEY_FORMGROUP = 'SurveyFormGoup';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  public setSurveyfg(surveyfg: any): void {
    window.sessionStorage.removeItem(SURVEY_FORMGROUP);
    window.sessionStorage.setItem(SURVEY_FORMGROUP, JSON.stringify(surveyfg))
  }

  public getSurveyfg(): string {
    return sessionStorage.getItem(SURVEY_FORMGROUP);
  }

  public clearSurveyfg(): void {
    window.sessionStorage.removeItem(SURVEY_FORMGROUP);
  }
}
