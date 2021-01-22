import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/auth/infraestructura/token.service';
import { Survey } from '../../dominio/survey';
import { SessionStorageService } from '../../infraestructura/session-storage.service';
import { SurveyService } from '../../infraestructura/survey.service';
import { MatListModule, MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-new-survey-users',
  templateUrl: './new-survey-users.component.html',
  styleUrls: ['./new-survey-users.component.css']
})
export class NewSurveyUsersComponent implements OnInit {
  @ViewChild('usuarios') usersSelectionList: MatSelectionList;
  @ViewChild('encuestados') surveyedSelectionList: MatSelectionList;

  surveyg: FormGroup;
  survey: Survey = new Survey();
  users: string[] = [''];
  surveyedl= [];
  constructor(
    private surveyService: SurveyService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private tokenService: TokenService,
    private formBuilder: RxFormBuilder,
    private storage: SessionStorageService) {
    this.surveyg = this.formBuilder.formGroup(this.survey);
  }

  ngOnInit() {
    this.cargarUsers();
    const storageValue = this.storage.getSurveyfg();
    if (storageValue) {
      this.surveyg = this.formBuilder.formGroup((new Survey(JSON.parse(storageValue))));
      if (this.surveyg.controls.surveyparticipants.value != null && this.surveyg.controls.surveyparticipants.value) {
        this.surveyedl = this.surveyg.controls.surveyparticipants.value
      }
    }
    this.surveyg.valueChanges.subscribe(selectedValue => {
      this.storage.setSurveyfg(selectedValue)
    })
  }

  cargarUsers(): void {
    this.users.length = 0
    this.surveyService
      .surveyadminRequestUsersInfo()
      .subscribe(
        data => {
          data.forEach(element => {
            this.users.push(element.username)
          });
          if (this.surveyg.controls.surveyparticipants.value != null && this.surveyg.controls.surveyparticipants.value) {
            this.surveyg.controls.surveyparticipants.value.forEach(element => {
              this.users = this.users.filter((e) => !e.includes(element.usuario))
            });
          }
        },
        err => {
          console.log(err);
        }
      );
  }

  transferusers(a: MatSelectionList) {
    const users = a.selectedOptions.selected.map((a) => a.value)
    users.forEach(element => {
      this.surveyedl.push({"usuario":element})
      this.users = this.users.filter((e) => !e.includes(element))
    });
    this.surveyg.controls.surveyparticipants.setValue(this.surveyedl)
  }

  transfersurveyed(a: MatSelectionList) {
    const surveyedl = a.selectedOptions.selected.map((a) => a.value)
    surveyedl.forEach(element => {
        this.users.push(element)
        this.surveyedl=this.surveyedl.filter((e)=> e.usuario!=element)
    this.surveyg.controls.surveyparticipants.setValue(this.surveyedl)
});
}

  selectAllUsers() {
    this.usersSelectionList.selectAll()
  }

  selectAllSurveyed() {
    this.surveyedSelectionList.selectAll()
  }

}
