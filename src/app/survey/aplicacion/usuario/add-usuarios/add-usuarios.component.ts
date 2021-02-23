import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { TokenService } from 'src/app/auth/infraestructura/token.service';

import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NgSelectModule } from '@ng-select/ng-select';

import { RxFormBuilder, FormBuilderConfiguration } from '@rxweb/reactive-form-validators';

import { CSVRecord } from './CSVRecord';
import { Application } from 'src/app/survey/dominio/application';
import { NuevosUsuarios } from 'src/app/auth/dominio/nuevos-usuarios';
import { NuevoUsuario } from 'src/app/auth/dominio/nuevo-usuario';
import { AuthService } from 'src/app/auth/infraestructura/auth.service';

@Component({
  selector: 'app-add-usuarios',
  templateUrl: './add-usuarios.component.html',
  styleUrls: ['./add-usuarios.component.css']
})
export class AddUsuariosComponent implements OnInit {
  @ViewChild('csvReader') csvReader: any;
  application: Application;
  NuevoUsuariofg: FormGroup;
  NuevosUsuarios: NuevosUsuarios;
  public records: any[] = [];

  constructor(

    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private tokenService: TokenService,
    private formBuilder: RxFormBuilder,
    private authService: AuthService,

  ) {
    this.NuevosUsuarios= new NuevosUsuarios();
    this.NuevoUsuariofg = this.formBuilder.formGroup(this.NuevosUsuarios);
  }

  ngOnInit(): void {
    console.log(this.NuevoUsuariofg);
  }

  uploadListener($event: any): void {
    let text = [];
    let files = $event.srcElement.files;
    if (this.isValidCSVFile(files[0])) {
      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);
      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
        let headersRow = this.getHeaderArray(csvRecordsArray);
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
          let usuarios = <FormArray>this.NuevoUsuariofg.controls.usuarios;
          usuarios.removeAt(0);
        this.records.forEach(element => {
          usuarios.push(this.formBuilder.formGroup(new NuevoUsuario(element.nombre,element.password)));
        });
        console.log(this.records);
      };
      reader.onerror = function() {
        console.log('error is occured while reading file!');
      };
    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }

    console.log(this.NuevosUsuarios);


  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];
    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: CSVRecord = new CSVRecord();
        csvRecord.nombre = curruntRecord[0].trim();
        csvRecord.password = curruntRecord[1].trim();
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.records = [];
  }
    onSubmit(customerData) {
      console.log(customerData);

      this.authService.nuevos(customerData).subscribe(
        data => {
          this.toastr.success('Usuarios guardados correctamente ', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
        },
        err => {
          //this.survey = null;
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          console.log(err.error.message);

          //this.router.navigate(['/']);
        }
      );

    }
}
