import { Component, OnInit } from '@angular/core';
import { ReactiveFormConfig } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'encuesta-app';
  ngOnInit(){
    //if you want to apply global configuration then use below code.
    ReactiveFormConfig.set({"validationMessage":{
   "email":"Email is Invalid",
   "compare":"Input does not match with password",
   "unique":"No debe haber dos elementos con el mismo nombre",
  "alpha":"Only alphabets are allowed"
    }});
  }
}
