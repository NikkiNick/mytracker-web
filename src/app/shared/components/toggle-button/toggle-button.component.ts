import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss']
})
export class ToggleButtonComponent {
  @Input() color?: string = '#FFFFFF';
  @Input() isActive?: boolean = false;
  @Output() active = new EventEmitter<boolean>();

  toggleActive(): void {
    this.isActive = !this.isActive;
    this.active.emit(this.isActive);
  }
}
