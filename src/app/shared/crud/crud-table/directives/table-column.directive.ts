import { Directive, ElementRef, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tableColumn]'
})
export class TableColumnDirective {

  @Input('tableColumn') columnName: string;
  @Input() centeredColumn = false;
  @Input() width?: number;

  constructor(public templateRef: TemplateRef<any>) {
  }

}
