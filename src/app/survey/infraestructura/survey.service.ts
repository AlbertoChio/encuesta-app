import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Survey } from '../dominio/survey';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json"})
};

@Injectable({
  providedIn: 'root'
})

export class SurveyService {
  constructor(private httpClient: HttpClient) { }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  surveyURL = 'http://localhost:8080/api/encuesta/';

  public lista() : Observable<any>{
    return this.httpClient.get(this.surveyURL,httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  public surveyuserParticipantRequestSurvey(surveyname: String): Observable<any> {
    return this.httpClient.get(this.surveyURL + `answer/${surveyname}`,httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
}
