import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './dialog-data.model';
import { IDialog } from './idialog.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, IDialog {

  @Input() heading?: string;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  close() {
    this.dialogRef.close();
  }

  confirm(){
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
