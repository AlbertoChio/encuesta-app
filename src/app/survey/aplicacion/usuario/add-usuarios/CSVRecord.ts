import { prop, propObject, propArray, required } from "@rxweb/reactive-form-validators"
import { catchError, map } from "rxjs/operators";
export class CSVRecord {
  @required()
  nombre: any;
    @required()
  password: any;

    constructor() {
        this.nombre = null;
        this.password = null;
    }
  }
