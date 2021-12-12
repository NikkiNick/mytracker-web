import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tableActionsColumn]'
})
export class TableActionsColumnDirective {
  constructor(public templateRef: TemplateRef<any>) { }
}
