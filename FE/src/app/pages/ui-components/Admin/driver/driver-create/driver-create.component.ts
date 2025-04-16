import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { DriverFile } from 'src/app/interface/driver.interface';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { DriverService } from '../../../../../services/apis/Admin/driver.service';
import { ImageUploaderDirective } from 'src/app/directives/images-upload.directive';
@Component({
  selector: 'app-driver-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatInputModule,
    ImageUploaderDirective,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './driver-create.component.html',
})
export class DriverCreateComponent implements OnInit, OnDestroy {
  driverForm: FormGroup;
  selectedFile: File | null = null;
  years: number[] = [];
  selectedTabIndex = 0;
  files: DriverFile[] = [];
  selectedAvatarFile: File | null = null;
  avatarFile: File | null = null;
  selectedFiles: File[] = [];
  avatarPreviewUrl: string | ArrayBuffer | null = null;


  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private driverService: DriverService,
  ) {

  }

  ngOnInit() {
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 50;
    const maxYear = currentYear - 22;
    this.years = [];
    for (let y = maxYear; y >= minYear; y--) {
      this.years.push(y);
    }

    this.driverForm = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.minLength(6)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]),
      licenseType: new FormControl('', Validators.required),
      experienceYears: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      licenseNumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
      YearBirthDate: new FormControl('', [Validators.required, this.dateLessThanTodayValidator()]),
      status: new FormControl('active')
    });
  }

  nextStep(event?: Event) {
    if (event) event.preventDefault();
    console.log('nextStep ', this.driverForm.valid);
    if (this.driverForm.valid) {
      this.selectedTabIndex = 1;
    } else {
      this.driverForm.markAllAsTouched();
    }
  }

  onDropFiles(files: DriverFile[]): void {
    // Lọc chỉ lấy file hợp lệ
    this.files = [...this.files, ...files.filter(f => 
      f.file && f.file.type.startsWith('image/')
    )];
  }

  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.selectedAvatarFile = file;
  
      // Tạo URL tạm để hiển thị ảnh
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreviewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.avatar.setValue(file);
      const reader = new FileReader();
      reader.onload = (e: any) => {
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number): void {
    if (typeof this.files[index].url === 'string') {
      URL.revokeObjectURL(this.files[index].url as string);
    }
    this.files.splice(index, 1);
    this.files = [...this.files];
  }

  cancel(): void {
    this.files.forEach(file => {
      if (typeof file.url === 'string') {
        URL.revokeObjectURL(file.url);
      }
    });
    this.driverForm.reset();
  }

  ngOnDestroy(): void {
    this.files.forEach(file => {
      if (typeof file.url === 'string') {
        URL.revokeObjectURL(file.url);
      }
    });
  }

  dateLessThanTodayValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today ? { futureDate: true } : null;
    };
  }

  get fullName() { return this.driverForm.get('fullName') as FormControl; }
  get phone() { return this.driverForm.get('phone') as FormControl; }
  get licenseType() { return this.driverForm.get('licenseType') as FormControl; }
  get experienceYears() { return this.driverForm.get('experienceYears') as FormControl; }
  get licenseNumber() { return this.driverForm.get('licenseNumber') as FormControl; }
  get YearBirthDate() { return this.driverForm.get('YearBirthDate') as FormControl; }
  get status() { return this.driverForm.get('status') as FormControl; }
  get avatar() { return this.driverForm.get('avatar') as FormControl; }



  calculateAge(): number | string {
    const year = this.YearBirthDate.value;
    if (!year) return '';
    const currentYear = new Date().getFullYear();
    return currentYear - year;
  }
  onSave() {
    this.driverForm.markAllAsTouched();
    if (this.driverForm.invalid) return;
  
    const formData = new FormData();
    formData.append('fullName', this.driverForm.value.fullName);
    formData.append('phone', this.driverForm.value.phone);
    formData.append('licenseType', this.driverForm.value.licenseType);
    formData.append('licenseNumber', this.driverForm.value.licenseNumber);
    formData.append('experienceYears', this.driverForm.value.experienceYears.toString());
    formData.append('YearBirthDate', this.driverForm.value.YearBirthDate.toString());
    formData.append('status', this.driverForm.value.status || 'active');
  
    if (this.selectedAvatarFile) {
      formData.append('avatar', this.selectedAvatarFile);
    }
  
    this.files.forEach((file, index) => {
      if (file.file) {
        formData.append('fileName', file.file); 
      }
    });

    this.driverService.Create(formData).subscribe({
      next: (res: any) => {
        this.notificationService.showSuccess(res.message || 'Thêm tài xế thành công');
        this.router.navigate(['/admin/driverGetAll']);
      },
      error: (err: any) => {
        this.notificationService.showError(err.error?.message || err.message || 'Lỗi không xác định');
      }
    });
  }
  
  
  
}