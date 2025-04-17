import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { BusTypeService } from '../../../../../services/apis/Admin/bustype.service';
import { BusesService } from '../../../../../services/apis/Admin/buses.service';
@Component({
  selector: 'app-buses-create',
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './buses-create.component.html',
})
export class BusesCreateComponent {
 constructor(
    private bustypeService: BusTypeService,
    private notificationService: NotificationService,
    private busesService: BusesService,
    private router: Router,
  ) { }

  bustypeOption: any[] = [];

  plateNumber = new FormControl('', Validators.required);
  busTypeId = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  totalSeats = new FormControl('', Validators.required);

  
  ngOnInit(): void {
    this.loadOptions();
  }

  loadOptions() {
    this.bustypeService.List().subscribe({
      next: (bustype: any) => {
        console.log('Dữ liệu loai xe:', bustype); 
        this.bustypeOption = bustype.data || [];
      },
      error: (err) => {
        console.log("Lỗi khi lấy danh sách tuyến đường!", err);
      }
    })
  }

  onSave() {
    const controls = {
      plateNumber: this.plateNumber,
      busTypeId: this.busTypeId,
      status: this.status,
      totalSeats: this.totalSeats,
    };

    Object.values(controls).forEach(control => control.markAsTouched());

    if (Object.values(controls).every(control => control.valid)) {
      const plateNumber = this.plateNumber.value ?? '';
      const status = (this.status.value ?? 'active') as 'active' | 'inactive';

      const data = {
        busTypeId: Number(this.busTypeId.value),
        totalSeats: Number(this.totalSeats.value),
        plateNumber,
        status,
      };

      console.log('Dữ liệu gửi lên:', data);
      this.busesService.Create(data).subscribe({
        next: (res) => {
          this.notificationService.showSuccess('Thêm tuyến xe thành công!');
          this.router.navigate(['/admin/busesGetAll']);
        },
        error: (err) => {
          this.notificationService.showError('Thêm thất bại!');
          console.error(err);
        }
      });
    }
  }

}
