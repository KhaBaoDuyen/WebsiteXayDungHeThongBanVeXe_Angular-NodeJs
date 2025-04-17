import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { BlogsService } from 'src/app/services/apis/Admin/blogs.Service'; // Import BlogsService
import { ClouService } from 'src/app/services/common/clou.service'; // Import ClouService
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { Router } from '@angular/router'; // Import Router để điều hướng

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
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

  constructor(
    private blogsService: BlogsService, // Inject BlogsService
    private clouService: ClouService, // Inject ClouService để upload ảnh
    private snackBar: MatSnackBar, // Inject MatSnackBar để hiển thị thông báo
    private router: Router // Inject Router để điều hướng
  ) {
    this.blogForm = new FormGroup({
      userID: new FormControl('', Validators.required),
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      content: new FormControl('', [Validators.required, Validators.minLength(10)]),
      image: new FormControl(null, Validators.required),
      status: new FormControl('active'), // <-- thêm dòng này nếu cần
      createAt: new FormControl(new Date().toISOString().slice(0, 16)) // Mặc định là ngày hiện tại
    });
  }

  // Xử lý chọn file ảnh
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

  // Lưu bài viết
  onSave() {
    if (this.blogForm.invalid) {
      this.blogForm.markAllAsTouched(); // Hiển thị lỗi nếu có
      return;
    }

    // Upload ảnh lên Cloudinary trước
    const file = this.blogForm.value.image;
    if (file) {
      this.clouService.uploadImage(file).subscribe({
        next: (res: any) => {
          // Lấy URL của ảnh đã upload
          const imageUrl = res.secure_url;

          // Gửi dữ liệu bài viết lên backend
          const blogData = {
            userId: this.blogForm.value.userID, // Đảm bảo key chính xác
            title: this.blogForm.value.title,
            content: this.blogForm.value.content,
            image: imageUrl, // Lưu URL ảnh từ Cloudinary
            status: this.blogForm.value.status, // Trạng thái bài viết
            createAt: this.blogForm.value.createAt
          };

          this.blogsService.Create(blogData).subscribe({
            next: (response) => {
              console.log('Bài viết đã được thêm thành công:', response);
              
              // Hiển thị thông báo toast khi bài viết được thêm thành công
              this.snackBar.open('Bài viết đã được thêm thành công!', 'Đóng', {
                duration: 3000, // Thời gian hiển thị toast (3 giây)
                panelClass: ['success-snackbar'], // Thêm class để tùy chỉnh màu sắc (nếu muốn)
              });

              // Điều hướng về trang danh sách bài viết
              this.router.navigate(['/admin/blogGetAll']); // Đảm bảo URL đúng với route danh sách bài viết
            },
            error: (err) => {
              console.error('Lỗi khi thêm bài viết:', err);
            }
          });
        },
        error: (err) => {
          console.error('Lỗi upload ảnh:', err);
        }
      });
    }
  }
}
