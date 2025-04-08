import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { contactInterface } from 'src/app/interface/contact.Interface';
import { NotificationService } from 'src/app/services/notification.service';
import { ContactService } from 'src/app/services/apis/Admin/contact.service';

@Component({
  selector: 'app-contact-reply',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './contact-reply.component.html',
})
export class ContactReplyComponent implements OnInit {
  replyForm: FormGroup;
  questionId: number = 0;
  questionData: contactInterface | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService,
    private notificationService: NotificationService
  ) {
    this.replyForm = this.fb.group({
      question: [''],
      email: [''],
      reply: ['', Validators.required],
      status: [''],
    });
  }

  ngOnInit(): void {
    this.questionId = +this.route.snapshot.paramMap.get('id')!;
    this.getData(this.questionId);
   
  }

  setFormData(contactData: any): void {
    this.replyForm.patchValue({
      question: contactData.question,
      email: contactData.email,
      reply: contactData.reply,
      status: contactData.status === 1,
    });
  }

  getData(id: number): void {
    this.contactService.getById(id).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.questionData = res.data;
          this.setFormData(res.data);
        } else {
          this.notificationService.showError(res.message || 'Không thể lấy dữ liệu');
        }
      },
      error: (err: any) => {
        this.notificationService.showError(err.error?.message || err.message || 'Lỗi không xác định');
      }
    });
  }

  onBack(): void {
    this.router.navigate(['/admin/contactGetAll']);
  }
  
  get reply() { return this.replyForm.get('reply'); }
  
  onUpdate(): void {
    this.replyForm.markAllAsTouched();
    if (this.replyForm.invalid) return;

    const contactData = {
      reply: this.replyForm.value.reply,
      status: this.replyForm.value.status ? 1 : 0,

    };

    this.contactService.Update(this.questionId, contactData).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.notificationService.showSuccess(res.message || 'Cập nhật thành công');
          this.router.navigate(['/admin/contactGetAll']);
        } else {
          this.notificationService.showError(res.message || 'Không thể cập nhật');
        }
      },
      error: (err: any) => {
        this.notificationService.showError(err.error?.message || err.message || 'Lỗi không xác định');
      }
    });
  }
}
