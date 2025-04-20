import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from 'src/app/layouts/Client/navbar/navbar.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { ProfileService } from '../../../../services/apis/Client/profile.service';
@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {

  form: FormGroup;
  userId!: string;
  avatarPreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private profileService: ProfileService
  ) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      role: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    console.log(this.userId);
    if (this.userId) {
      this.profileService.getById(Number(this.userId)).subscribe({
        next: (res: any) => {
          const user = res.data;

          this.form.patchValue({
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            status: user.status,
          });

          this.avatarPreview = `http://localhost:3001/upload/drivers/${user.image}`;
        },
        error: (err) => {
          this.notificationService.showError('Lấy dữ liệu thất bại!');
          console.error(err);
        }
      });
    }
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onUpdate(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('fullName', this.form.value.fullName);
      formData.append('email', this.form.value.email);
      formData.append('phone', this.form.value.phone);
      formData.append('role', this.form.value.role);

      const statusValue = this.form.value.status === 1 ? 1 : 0;
      formData.append('status', statusValue.toString());

      if (this.selectedFile) {
        formData.append('avatar', this.selectedFile);
      }

      this.profileService.Update(Number(this.userId), formData).subscribe({
        next: () => {
          this.notificationService.showSuccess('Cập nhật user thành công!');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.notificationService.showError('Cập nhật thất bại!');
          console.error(err);
        }
      });
    }
  }
}
