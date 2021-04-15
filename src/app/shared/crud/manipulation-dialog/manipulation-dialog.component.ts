import { trigger } from '@angular/animations';
import { AfterContentChecked, AfterContentInit, Component, ContentChild, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { DialogData } from 'src/app/dialog-data.model';
import { DialogComponent } from '../../dialog/dialog.component';
import { SnackBarService } from '../../snackbar/snack-bar.service';
import { ICrudService } from '../crud.service';
import { IBaseModel } from '../models/ibase-model';
import { IManipulationDialog } from './imanipulation-dialog.interface';
import { ManipulationDialogData } from './manipulation-dialog-data.model';

@Component({
  selector: 'app-manipulation-dialog',
  templateUrl: './manipulation-dialog.component.html',
  styleUrls: ['./manipulation-dialog.component.scss']
})
export class ManipulationDialogComponent<T extends IBaseModel> extends DialogComponent implements OnInit, AfterContentInit, IManipulationDialog<T> {

  isLoading: boolean = true;
  isEdit: boolean = true;

  @Input() service: ICrudService<T>;
  @Input() heading?: string;
  model: BehaviorSubject<T>
  @ContentChild("manipulationForm") contentForm?: NgForm;

  constructor(
    public router: Router,
    public snackbarService: SnackBarService,
    public dialogRef: MatDialogRef<ManipulationDialogComponent<T>>,
    @Inject(MAT_DIALOG_DATA) public data: ManipulationDialogData){
      super(dialogRef, data);
      this.model = new BehaviorSubject<T>(null);
  }
  ngAfterContentInit(): void {
    this.loadModel();
  }
  ngOnInit(): void {
  }
  loadModel(){
    if(this.data.modelId){
      this.service.getById(this.data.modelId).subscribe(
        (model) => {
          this.model.next(model);
          this.isLoading = false;
        },
        (err) => this.snackbarService.showHttpError(err)
      );
    }
    else{
      this.model.next({} as T);
      this.isLoading = false;
      this.isEdit = false;
    }
  }

  confirm(): void{
    this.model = this.dialogRef.componentInstance.model;
    if(this.data.modelId){
      this.service.update(this.model.value).subscribe(
        (res) => {
          console.log("ok")
          this.snackbarService.show("Succesfully updated item");
          this.router.navigateByUrl(this.data.navigateTo || this.router.url);
          this.dialogRef.close();
        },
        (err) => this.snackbarService.showHttpError(err),
      );
    } else{
      this.service.insert(this.model.value).subscribe(
        (res) => {
          this.snackbarService.show("Succesfully added item");
          this.router.navigateByUrl(this.data.navigateTo || this.router.url);
          this.dialogRef.close();
      },
        (err) => this.snackbarService.showHttpError(err),
      );
    }
  }

}
