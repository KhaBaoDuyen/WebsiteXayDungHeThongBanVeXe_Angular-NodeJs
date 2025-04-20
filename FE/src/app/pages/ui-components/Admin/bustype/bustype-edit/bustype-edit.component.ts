import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BusTypeService } from 'src/app/services/apis/Admin/bustype.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BusTypeInterface } from 'src/app/interface/bus-type.interface';

@Component({
  selector: 'app-bustype-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './bustype-edit.component.html',
})
export class BustypeEditComponent implements OnInit {
  busTypeForm: FormGroup;
  busTypeData: BusTypeInterface;
  allBusTypes: BusTypeInterface[] = [];
  filteredBusTypes: BusTypeInterface[] = [];

  constructor(
    private busTypeService: BusTypeService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadBusTypeData();
    this.loadAllBusTypes(); // Tải danh sách tất cả các loại xe
  }

  initForm() {
    this.busTypeForm = new FormGroup({
      typeName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      totalSeat: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      status: new FormControl('active'),
    });
  }

  get typeName() {
    return this.busTypeForm.get('typeName') as FormControl;
  }
  get totalSeat() {
    return this.busTypeForm.get('totalSeat') as FormControl;
  }
  get status() {
    return this.busTypeForm.get('status') as FormControl;
  }

  loadBusTypeData() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.busTypeService.getById(Number(id)).subscribe({
        next: (res: any) => {
          this.busTypeData = res.data; // Lưu dữ liệu loại xe cụ thể
          this.busTypeForm.patchValue(res.data);
        },
        error: (err) => {
          this.notificationService.showError('Không thể tải dữ liệu loại xe');
          console.error('Error loading', err);
        },
      });
    }
  }

  loadAllBusTypes() {
    this.busTypeService.List().subscribe({
      next: (res: any) => {
        this.allBusTypes = res.data; 
        this.filteredBusTypes = [...this.allBusTypes]; // Khởi tạo filteredBusTypes
      },
      error: (err) => {
        this.notificationService.showError('Không thể tải danh sách loại xe');
        console.error('Error loading all bus types', err);
      },
    });
  }

  handleSearch(searchTerm: string) {
    const keyword = searchTerm.trim().toLowerCase();
    if (!keyword) {
      this.filteredBusTypes = [...this.allBusTypes]; // Hiển thị lại toàn bộ danh sách
    } else {
      this.filteredBusTypes = this.allBusTypes.filter((busType) =>
        busType.typeName?.toLowerCase().includes(keyword)
      );
    }
  }

  onSave() {
    this.busTypeForm.markAllAsTouched();
    if (this.busTypeForm.invalid) return;

    const busTypeId = this.route.snapshot.paramMap.get('id');
    const data = this.busTypeForm.value;

    this.busTypeService.Update(Number(busTypeId), data).subscribe({
      next: (res) => {
        this.notificationService.showSuccess('Cập nhật thành công!');
        this.router.navigate(['/admin/busTypeGetAll']);
      },
      error: (err) => {
        console.error('Error updating:', err);
        this.notificationService.showError('Cập nhật thất bại');
      },
    });
  }
}