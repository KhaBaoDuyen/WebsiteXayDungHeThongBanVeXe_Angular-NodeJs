import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { BusTypeService } from '../../../../../services/apis/Admin/bustype.service';
import { BusesService } from '../../../../../services/apis/Admin/buses.service';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-buses-edit',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, MaterialModule],
  templateUrl: './buses-edit.component.html',
})
export class BusesEditComponent {
  constructor(
    private bustypeService: BusTypeService,
    private notificationService: NotificationService,
    private busesService: BusesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  bustypeOption: any[] = [];
  busId!: number;

  plateNumber = new FormControl('', Validators.required);
  busTypeId = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  // totalSeats = new FormControl('', Validators.required);

  ngOnInit(): void {
    this.busId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadBusData();
    this.loadOptions();
  }

  loadOptions() {
    this.bustypeService.List().subscribe({
      next: (bustype: any) => {
        this.bustypeOption = bustype.data || [];
      },
      error: (err) => {
        console.log("Lỗi khi lấy danh sách loại xe!", err);
      }
    });
  }

  loadBusData() {
    this.busesService.getById(this.busId).subscribe({
      next: (res: any) => {
        const bus = res.data;
        this.plateNumber.setValue(bus.plateNumber);
        this.busTypeId.setValue(bus.busTypeId);
        this.status.setValue(bus.status);
        // this.totalSeats.setValue(bus.totalSeats);
      },
      error: (err) => {
        console.log('Lỗi khi tải dữ liệu xe!', err);
      }
    });
  }

  onUpdate() {
    const controls = {
      plateNumber: this.plateNumber,
      busTypeId: this.busTypeId,
      status: this.status,
      // totalSeats: this.totalSeats,
    };

    Object.values(controls).forEach(control => control.markAsTouched());

    if (Object.values(controls).every(control => control.valid)) {
      const plateNumber = this.plateNumber.value ?? '';
      const status = (this.status.value ?? 'active') as 'active' | 'inactive';

      const data = {
        id: this.busId,
        plateNumber,
        busTypeId: Number(this.busTypeId.value),
        status,
        // totalSeats: Number(this.totalSeats.value)
      };

      this.busesService.Update(this.busId, data).subscribe({
        next: () => {
          this.notificationService.showSuccess('Cập nhật xe thành công!');
          this.router.navigate(['/admin/busesGetAll']);
        },
        error: (err) => {
          this.notificationService.showError('Cập nhật thất bại!');
          console.error(err);
        }
      });
    }
  }
}