import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  show(message: string, config: MatSnackBarConfig = { duration: 2500 }) {
    this.snackBar.open(message, null, config);
  }
  showHttpError(error: HttpErrorResponse, prefix: string = '') {
    const message = `${prefix}Error (${error.status}) - ${error.error}`;
    this.show(message);
  }

}
