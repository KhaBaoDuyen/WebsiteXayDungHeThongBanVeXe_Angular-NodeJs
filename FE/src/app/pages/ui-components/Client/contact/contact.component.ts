import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ContactService } from 'src/app/services/apis/Client/contact.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-contact',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  constructor(
    private contactService: ContactService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  fromContact = new FormGroup({
    fullName: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    question: new FormControl('', [
      Validators.required,
      Validators.minLength(20)
    ])
  })

  get fullName() { return this.fromContact.get('fullName') };
  get email() { return this.fromContact.get('email') };
  get question() { return this.fromContact.get('question') };

  create() {
    this.fromContact.markAllAsTouched();
    if (this.fromContact.invalid) {
      return
    }

    const data = {
      fullName: this.fromContact.value.fullName,
      email: this.fromContact.value.email,
      question: this.fromContact.value.question,
    }

    this.contactService.Create(data).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.notificationService.showSuccess(res.message);
        
        } 
        this.fromContact.reset();
      },
      error: (err: any) => {
        this.notificationService.showError(err.error?.message || err.message || 'Lỗi không xác định');
      } 
     
    });
  }
}
