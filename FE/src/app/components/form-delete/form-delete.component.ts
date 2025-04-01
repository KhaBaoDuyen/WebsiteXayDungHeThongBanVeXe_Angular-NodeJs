import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-form-delete',
  templateUrl: './form-delete.component.html',
})
export class FormDeleteComponent {
  @Output() deleteConfirmed = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  constructor() {}

  onDelete() {
    this.deleteConfirmed.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}