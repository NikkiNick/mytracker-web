import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent implements OnInit {

  @Input() color?: string = "#FFFFFF";
  @Input() isActive?: boolean = false;
  @Output() active = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleActive(): void{
    this.isActive = !this.isActive;
    this.active.emit(this.isActive)
  }

}
