import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './dialog-data.model';
import { IDialog } from './idialog.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements IDialog {
  @Input() heading?: string;
  @Input() showButtons = false;
  @Input() closeButton?: string;
  @Input() confirmButton?: string;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  close() {
    this.dialogRef.close(false);
  }

  confirm() {
    this.dialogRef.close(true);
  }

}
