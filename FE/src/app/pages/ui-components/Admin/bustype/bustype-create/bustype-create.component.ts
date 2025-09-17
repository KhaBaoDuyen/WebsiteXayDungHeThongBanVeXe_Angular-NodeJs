import { BusTypeService } from './../../../../../services/apis/Admin/bustype.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { BusesService } from 'src/app/services/apis/Admin/buses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bustype-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './bustype-create.component.html',
})
export class BustypeCreateComponent {
  busTypeFrom: FormGroup;

  constructor(
    private bustypeService: BusTypeService,
    private notificationService: NotificationService,
    private busesService: BusesService,
    private router: Router,
    private fb: FormBuilder
  ) {

  }
  ngOnInit() {

    this.busTypeFrom = new FormGroup({
      typeName: new FormControl('', [Validators.required, Validators.minLength(6)]),
      totalSeat: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      status: new FormControl('active')
    });
  }

  get typeName() { return this.busTypeFrom.get('typeName') as FormControl; }
  get totalSeat() { return this.busTypeFrom.get('totalSeat') as FormControl; }
  get status() { return this.busTypeFrom.get('status') as FormControl; }


  onSave() {
    this.busTypeFrom.markAllAsTouched();
    if (this.busTypeFrom.invalid) return;

    const data = this.busTypeFrom.value;

    this.bustypeService.Create(data).subscribe({
      next: (res) => {
        this.notificationService.showSuccess('Thêm loại xe thành công!');
        this.router.navigate(['/admin/busTypeGetAll']);
      },
      error: (err) => {
        this.notificationService.showError('Thêm thất bại!');
        console.error(err);
      }
    });
  }
}
