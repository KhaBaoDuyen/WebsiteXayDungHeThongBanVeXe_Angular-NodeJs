import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { DriverService } from '../../../../../services/apis/Admin/driver.service';
import { ImageUploaderDirective } from 'src/app/directives/images-upload.directive';
import { driveriInterface, DriverFile } from 'src/app/interface/driver.interface';

@Component({
  selector: 'app-driver-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ImageUploaderDirective
  ],
  templateUrl: './driver-edit.component.html',
})
export class DriverEditComponent implements OnInit, OnDestroy {
  driverForm: FormGroup;
  selectedTabIndex = 0;
  files: DriverFile[] = [];
  selectedAvatarFile: File | null = null;
  avatarPreviewUrl: string | ArrayBuffer | null = null;
  years: number[] = [];
  deletedFiles: string[] = [];



  driver: driveriInterface = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private driverService: DriverService
  ) {

  }

  ngOnInit() {
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 50;
    const maxYear = currentYear - 22;
    for (let y = maxYear; y >= minYear; y--) {
      this.years.push(y);
    }

    const driverId = this.route.snapshot.paramMap.get('id');
    if (driverId) {
      this.getById(Number(driverId)); 
    }

    this.driverForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
      licenseType: ['', Validators.required],
      licenseNumber: ['', [Validators.required, Validators.minLength(10)]],
      experienceYears: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      YearBirthDate: ['', [Validators.required, this.dateLessThanTodayValidator()]],
      status: ['active']
    });
  }

  getById(id: number): void {
    this.driverService.getById(id).subscribe({
      next: (res: any) => {
        if (res.success && res.data) {
          this.driver = res.data;
          this.setFromData(res.data);

          if (res.data.files && res.data.files.length > 0) {
            this.files = res.data.files.map((file: any) => ({
              file: null, 
              url: `http://localhost:3001/upload/drivers/${file.fileName}`,
              fileName: file.fileName,
            }));
          }
          
          if (res.data.image) {
            this.avatarPreviewUrl = `http://localhost:3001/upload/drivers/${res.data.image}`;
          }
        } else {
          console.error("Lỗi lấy dữ liệu tài xế");
        }
      },
      error: (err: any) => {
        console.error('API Error:', err);
        this.notificationService.showError(err.error?.message || err.message || 'Lỗi không xác định');
      }
    });

  }

  ngOnDestroy(): void {
    // Clean up file URLs
    this.files.forEach(file => {
      if (typeof file.url === 'string') {
        URL.revokeObjectURL(file.url);
      }
    });
  }

  dateLessThanTodayValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const selectedYear = parseInt(control.value, 10);
      const currentYear = new Date().getFullYear();
      return selectedYear >= currentYear ? { futureDate: true } : null;
    };
  }

  get fullName() { return this.driverForm.get('fullName') as FormControl; }
  get phone() { return this.driverForm.get('phone') as FormControl; }
  get licenseType() { return this.driverForm.get('licenseType') as FormControl; }
  get experienceYears() { return this.driverForm.get('experienceYears') as FormControl; }
  get licenseNumber() { return this.driverForm.get('licenseNumber') as FormControl; }
  get YearBirthDate() { return this.driverForm.get('YearBirthDate') as FormControl; }
  get status() { return this.driverForm.get('status') as FormControl; }

  setFromData(driverForm: any) {
    this.driverForm.patchValue({
      fullName: driverForm.fullName,
      phone: driverForm.phone,
      licenseType: driverForm.licenseType,
      experienceYears: driverForm.experienceYears,
      licenseNumber: driverForm.licenseNumber,
      YearBirthDate: driverForm.YearBirthDate,
      status: driverForm.status,
    })
  }

  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.selectedAvatarFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreviewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(file => {
        this.files.push({ url: URL.createObjectURL(file), file });
      });
    }
  }

  onDropFiles(files: DriverFile[]): void {
    this.files = [...this.files, ...files.filter(f => f.file && f.file.type.startsWith('image/'))];
  }

  removeImage(index: number): void {
    const file = this.files[index];
    if (file.fileName) {
      this.deletedFiles.push(file.fileName);
    }
    if (typeof file.url === 'string' && file.file) {
      URL.revokeObjectURL(file.url);
    }
  
    this.files.splice(index, 1);
  }
  
  nextStep(event?: Event): void {
    if (event) event.preventDefault();
    if (this.driverForm.valid) {
      this.selectedTabIndex = 1;
    } else {
      this.driverForm.markAllAsTouched();
    }
  }

  cancel(): void {
    this.files.forEach(file => {
      if (typeof file.url === 'string') {
        URL.revokeObjectURL(file.url);
      }
    });
    this.driverForm.reset();
    this.router.navigate(['/admin/driverGetAll']);
  }

  calculateAge(): number | string {
    const year = this.YearBirthDate.value;
    if (!year) return '';
    const currentYear = new Date().getFullYear();
    return currentYear - year;
  }

  onSave(): void {
    this.driverForm.markAllAsTouched();
    if (this.driverForm.invalid) return;
    const driverId = this.route.snapshot.paramMap.get('id');


    const formData = new FormData();
    formData.append('fullName', this.driverForm.value.fullName);
    formData.append('phone', this.driverForm.value.phone);
    formData.append('licenseType', this.driverForm.value.licenseType);
    formData.append('licenseNumber', this.driverForm.value.licenseNumber);
    formData.append('experienceYears', this.driverForm.value.experienceYears);
    formData.append('YearBirthDate', this.driverForm.value.YearBirthDate);
    formData.append('status', this.driverForm.value.status || 'active');

    if (this.selectedAvatarFile) {
      formData.append('avatar', this.selectedAvatarFile);
    }

    this.files.forEach((file, index) => {
      if (file.file) {
        formData.append('fileName', file.file);
      }
    });

    if (this.deletedFiles.length > 0) {
      this.deletedFiles.forEach(fileName => {
        formData.append('deletedFiles', fileName);
      });
    }

    this.driverService.Update(Number(driverId), formData).subscribe({
      next: (res: any) => {
        this.notificationService.showSuccess(res.message || 'Cập nhật tài xế thành công');
        this.router.navigate(['/admin/driverGetAll']);
      },
      error: (err: any) => {
        this.notificationService.showError(err.error?.message || err.message || 'Lỗi không xác định');
      }
    });
  }
}