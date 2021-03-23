import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  title: String;
  message: String;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { 

      this.title = data.title;
      this.message = data.message;

    }

  ngOnInit(): void {
  }

  confirm(){
    this.dialogRef.close(true);
  }
  cancel(){
    this.dialogRef.close();
  }

}
