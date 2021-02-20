import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/auth/infraestructura/token.service';
import { Category } from 'src/app/question/dominio/category';
import { Question } from 'src/app/question/dominio/question';
import { Segmentation } from '../../dominio/segmentation';
import { Segmentationitem } from '../../dominio/segmentationitem';
import { Survey } from '../../dominio/survey';
import { SurveyService } from '../../infraestructura/survey.service';
import { SessionStorageService } from '../../infraestructura/session-storage.service';
import { Subject } from 'rxjs';
import { MatSelectionList } from '@angular/material/list';


@Component({
  selector: 'app-mod-survey',
  templateUrl: './mod-survey.component.html',
  styleUrls: ['./mod-survey.component.css']
})

export class ModSurveyComponent implements OnInit, OnDestroy {

  @ViewChild('usuarios') usersSelectionList: MatSelectionList;
  @ViewChild('encuestados') surveyedSelectionList: MatSelectionList;

  users = [];
  surveyedl= [];

  private destroy = new Subject();
  private destroy$ = this.destroy.asObservable();
  surveyg: FormGroup;
  survey: Survey = new Survey();
  surveyname = this.activatedRoute.snapshot.params.surveyname;
  storageValue = this.storage.getSurveyfg();
  fechaEnMiliseg = Date();
  formready: boolean = false;
  constructor(
    private surveyService: SurveyService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private tokenService: TokenService,
    private formBuilder: RxFormBuilder,
    private storage: SessionStorageService,
    private cdRef: ChangeDetectorRef) {
    this.surveyg = this.formBuilder.formGroup(this.survey);

  }

  ngAfterViewChecked() {
    console.log("! changement de la date du composant !");
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  ngOnInit() {
    this.cargarsurvey();
    this.cargarUsers();
  }

  cargarsurvey() {
    if (this.surveyname) {
      this.surveyService.surveyadminrequestSurveyNewSurveyDto(this.surveyname).subscribe(
        data => {
          this.survey = new Survey(data);
          this.survey.surveyExpirationDate = ""
          this.survey.surveyStartDate = ""
          this.survey.surveyparticipants = data.surveyparticipants
          this.surveyedl= data.surveyparticipants
          this.surveyg = this.formBuilder.formGroup(this.survey);
          this.storage.clearSurveyfg();
        },
        err => {
          console.log(err);
        }
      );
    } else if (this.storageValue) {
      this.survey = new Survey(JSON.parse(this.storageValue));
      this.survey.surveyExpirationDate = ""
      this.survey.surveyStartDate = ""
      this.survey.surveyId = null
      this.survey.categories.forEach(element => {
        element.categoryId = null;
        element.questions.forEach(elementt => {
          elementt.questionId = null;
        });
      });
      this.survey.segmentations.forEach(element => {
        element.segmentationId = null;
        element.segmentationitems.forEach(elementt => {
          elementt.segmentationitemId = null;
        });
      });
      this.survey.surveyparticipants = this.storageValue['surveyparticipants'];
      this.surveyg = this.formBuilder.formGroup(this.survey);
      this.surveyg.valueChanges.subscribe(selectedValue => {
        this.storage.setSurveyfg(selectedValue)
      })
    }
    else {
      this.survey.surveyExpirationDate = ""
      this.survey.surveyStartDate = ""
      this.surveyg = this.formBuilder.formGroup(this.survey);
      this.surveyg.valueChanges.subscribe(selectedValue => {
        this.storage.setSurveyfg(selectedValue)
      })
    }
  }

  cargarUsers(): void {
    this.users.length = 0
    this.surveyService
      .surveyadminRequestUsersInfo()
      .subscribe(
        data => {
          console.log(data);
          this.users=data
          console.log(this.users);

          if (this.surveyg.controls.surveyparticipants.value != null && this.surveyg.controls.surveyparticipants.value) {
            this.surveyg.controls.surveyparticipants.value.forEach(element => {


              this.users = this.users.filter((e) => !e['usuario'].includes(element.usuario))
            });
          }

          console.log(this.surveyedl);

        },
        err => {
          console.log(err);
        }
      );
  }

  onSubmit(content) {
    this.storage.clearSurveyfg();
    this.surveyService.surveyadminsubmitSurveyUpdateSurveyDto(content,this.surveyname).subscribe(
      data => {
        this.toastr.success(data.mensaje, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      },
      err => {
        this.surveyg = this.formBuilder.formGroup(this.survey);
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );
  }

  addCategory() {
    let categories = <FormArray>this.surveyg.controls.categories;
    categories.push(this.formBuilder.formGroup(new Category()));
  }

  removeCategory(i: number) {
    let categories = <FormArray>this.surveyg.controls.categories;
    categories.removeAt((i));
  }

  addQuestion(i: number) {
    let questions = <FormArray>this.surveyg.controls.categories['controls'][i]['controls']['questions'];
    questions.push(this.formBuilder.formGroup(new Question()));
  }

  removeQuestion(i1: number, i: number) {
    let questions = <FormArray>this.surveyg.controls.categories['controls'][i]['controls']['questions'];
    questions.removeAt((i1));
  }

  addSegmentation() {
    let segmentations = <FormArray>this.surveyg.controls.segmentations;
    segmentations.push(this.formBuilder.formGroup(new Segmentation()));
  }

  addSegmentationitem(i: number) {
    let items = <FormArray>this.surveyg.controls.segmentations['controls'][i]['controls']['segmentationitems'];
    items.push(this.formBuilder.formGroup(new Segmentationitem()));
  }

  removeSegmentation(i: number) {
    let segmentations = <FormArray>this.surveyg.controls.segmentations;
    segmentations.removeAt((i));
  }

  removeSegmentationitem(i1: number, i: number) {
    let items = <FormArray>this.surveyg.controls.segmentations['controls'][i]['controls']['segmentationitems'];
    items.removeAt((i1));
  }

  transferusers(a: MatSelectionList) {
  const users = a.selectedOptions.selected.map((a) => a.value)
  users.forEach(element => {
    console.log(element);
    this.surveyedl.push({"usuarioId":element.usuarioId,"usuario":element.usuario})
    this.users = this.users.filter((e) => !e['usuario'].includes(element.usuario))

  });
  console.log(this.surveyedl);

  this.surveyg.controls.surveyparticipants.setValue(this.surveyedl)
}

transfersurveyed(a: MatSelectionList) {
  const surveyedl = a.selectedOptions.selected.map((a) => a.value)
  surveyedl.forEach(element => {
    console.log(element);

      this.users.push({"usuarioId":element.usuarioId,"usuario":element.usuario})
      this.surveyedl=this.surveyedl.filter((e) => !e['usuario'].includes(element.usuario))
  this.surveyg.controls.surveyparticipants.setValue(this.surveyedl)
});
console.log(this.users);
console.log(this.surveyedl);
}

selectAllUsers() {
  this.usersSelectionList.selectAll()
}

selectAllSurveyed() {
  this.surveyedSelectionList.selectAll()
}

}
