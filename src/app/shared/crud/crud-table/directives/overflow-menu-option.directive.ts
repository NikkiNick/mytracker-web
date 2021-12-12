import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[overflowMenuOption]'
})
export class OverflowMenuOptionDirective {
  constructor(public templateRef: TemplateRef<any>, public vcr: ViewContainerRef) { }
}
