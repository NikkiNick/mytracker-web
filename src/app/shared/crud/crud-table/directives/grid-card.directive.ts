import { ContentChild, Directive, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { GridCardContentDirective } from './grid-card-content.directive';
import { GridCardTitleDirective } from './grid-card-title.directive';

@Directive({
  selector: '[gridCard]'
})
export class GridCardDirective {
  @Input() cardStyle: any;
  @ViewChild(GridCardTitleDirective, { read: TemplateRef }) title: TemplateRef<any>;
  @ViewChild(GridCardContentDirective) content: GridCardContentDirective;

  constructor(public templateRef: TemplateRef<any>, public vcr: ViewContainerRef) { }

}
