import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-cancel',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './form-cancel.component.html',
})
export class FormCancelComponent {
  @Input() Id!: number; 

  isModalOpen = false;
  showTextarea = false;

  constructor(private router: Router){
    
  }
  openCancelModal(id: number) {
    this.Id = id;
    this.isModalOpen = true;
  }

  closeCancelModal() {
    this.isModalOpen = false;
  }

  onSubmit() {
    console.log('Submit form với id:', this.Id);
    this.closeCancelModal();
  }
  
  toggleTextarea(isDisabled: boolean) {
    this.showTextarea = !isDisabled;
  }
}
