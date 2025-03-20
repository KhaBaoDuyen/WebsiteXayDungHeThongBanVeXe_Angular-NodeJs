import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class BlogCreateComponent {
  postForm = new FormGroup({
    userID: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    content: new FormControl('', [Validators.required, Validators.minLength(10)]),
    image: new FormControl<File | null>(null, [Validators.required]),
    createAt: new FormControl({ value: new Date().toISOString(), disabled: true }, [Validators.required]),
  });

  selectedFileName = signal<string>('Chưa chọn tệp');
  errorMessage = signal<string>('');

  constructor() {
    merge(
      this.postForm.controls['title'].statusChanges,
      this.postForm.controls['content'].statusChanges,
      this.postForm.controls['image'].statusChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    const titleCtrl = this.postForm.controls['title'];
    const contentCtrl = this.postForm.controls['content'];
    const imageCtrl = this.postForm.controls['image'];

    if (titleCtrl.hasError('required')) {
      this.errorMessage.set('Tiêu đề là bắt buộc');
    } else if (titleCtrl.hasError('minlength')) {
      this.errorMessage.set('Tiêu đề phải có ít nhất 5 ký tự');
    } else if (contentCtrl.hasError('required')) {
      this.errorMessage.set('Nội dung là bắt buộc');
    } else if (contentCtrl.hasError('minlength')) {
      this.errorMessage.set('Nội dung phải có ít nhất 10 ký tự');
    } else if (imageCtrl.hasError('required')) {
      this.errorMessage.set('Ảnh là bắt buộc');
    } else {
      this.errorMessage.set('');
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.postForm.patchValue({ image: file });
      this.postForm.get('image')?.updateValueAndValidity();
      this.selectedFileName.set(file.name);
    }
    this.updateErrorMessage();
  }

  submitPost() {
    if (this.postForm.invalid) {
      this.updateErrorMessage();
      return;
    }

    const formData = new FormData();
    formData.append('userID', this.postForm.get('userID')?.value || '');
    formData.append('title', this.postForm.get('title')?.value || '');
    formData.append('content', this.postForm.get('content')?.value || '');
    formData.append('createAt', this.postForm.get('createAt')?.value || '');

    const file = this.postForm.get('image')?.value as File;
    if (file) {
      formData.append('image', file);
    }

    console.log('Bài viết đã được gửi', formData);
    // Gửi formData lên server qua API
  }
}
