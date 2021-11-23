import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[gridCardContent]'
})
export class GridCardContentDirective {
  constructor(public templateRef: TemplateRef<any>) { }
}
