import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-result-box',
  templateUrl: './result-box.component.html',
  styleUrl: './result-box.component.scss'
})
export class ResultBoxComponent {
  @Input() isSuccessful: boolean;
  @Input() message: string;
  @Output() closed = new EventEmitter<void>();

  onClose() {
    this.closed.emit();
  }
}
