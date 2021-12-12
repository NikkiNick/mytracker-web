import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tableColumn]'
})
export class TableColumnDirective {
  @Input('tableColumn') columnName: string;
  @Input() centeredColumn = false;
  @Input() alignment: 'left' | 'center' | 'right' = 'left';
  @Input() width?: number;

  constructor(public templateRef: TemplateRef<any>) {
  }
}
