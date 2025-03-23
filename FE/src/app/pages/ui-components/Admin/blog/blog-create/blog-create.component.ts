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
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';

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
    ReactiveFormsModule,
    CKEditorModule
  ]
})
export class BlogCreateComponent {
  blogForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null; // Hiển thị ảnh xem trước
  public Editor: any = ClassicEditorBuild;

  constructor() {
    this.blogForm = new FormGroup({
      userID: new FormControl('', Validators.required),
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      content: new FormControl('', [Validators.required, Validators.minLength(10)]),
      image: new FormControl(null, Validators.required),
      createAt: new FormControl(new Date().toISOString().slice(0, 16)) // Mặc định là ngày hiện tại
    });
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.blogForm.patchValue({ image: file });
      this.blogForm.get('image')?.updateValueAndValidity();

      // Hiển thị ảnh xem trước
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSave() {
    if (this.blogForm.invalid) {
      this.blogForm.markAllAsTouched(); // Hiển thị lỗi nếu có
      return;
    }
    console.log('Dữ liệu hợp lệ:', this.blogForm.value);
  }
}
