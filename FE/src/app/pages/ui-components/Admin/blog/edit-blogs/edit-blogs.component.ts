import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { blogInterface } from 'src/app/interface/blogInterface';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-edit-blogs',
  templateUrl: './edit-blogs.component.html',
  styleUrls: ['./edit-blogs.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CKEditorModule],
})
export class EditBlogsComponent {
  blogForm: FormGroup;
  public Editor: any = ClassicEditorBuild;
  blog: blogInterface = {
    id: 1,
    title: 'Cách học Angular hiệu quả',
    content: 'Bài viết này hướng dẫn cách học Angular từ cơ bản đến nâng cao.',
    image: 'assets/images/blog-1.jpg',
    status: 'active',
    createAt: '2024-03-21'
  };

  constructor(private fb: FormBuilder) {
    this.blogForm = this.fb.group({
      title: [this.blog.title, [Validators.required, Validators.minLength(5)]],
      status: [this.blog.status, Validators.required],
      content: [this.blog.content, [Validators.required, Validators.minLength(20)]],
      image: [null],
    });
  }

  get title() { return this.blogForm.get('title'); }
  get status() { return this.blogForm.get('status'); }
  get content() { return this.blogForm.get('content'); }

  onSubmit() {
    if (this.blogForm.invalid) {
      this.blogForm.markAllAsTouched();
      return;
    }
    console.log(this.blogForm.value);
  }
}
