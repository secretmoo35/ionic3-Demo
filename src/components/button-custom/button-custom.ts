import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'button-custom',
  templateUrl: 'button-custom.html'
})
export class ButtonCustomComponent {

  @Input() text: string;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  click() {
    this.onClick.emit();
  }

}
