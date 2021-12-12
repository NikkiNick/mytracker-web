import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[gridCardTitle]'
})
export class GridCardTitleDirective {
  @Input() cardStyle: any;
  constructor(public templateRef: TemplateRef<any>) { }
}
