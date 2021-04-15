import { Component, ContentChild, Inject, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  @Input() showButtons?: boolean = false;
  @Input() closeButton?: string;
  @Input() confirmButton?: string;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  close() {
    this.dialogRef.close(false);
  }

  confirm(){
    this.dialogRef.close(true);
  }

  ngOnInit(): void {
  }

}
