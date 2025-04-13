import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { busRouteInterface } from '../../../../../interface/bus-route.interface';
import { TripsService } from 'src/app/services/apis/Admin/trips.service';
import { NotificationService } from '../../../../../services/notification.service';
import { RoutesService } from 'src/app/services/apis/Admin/routes.service';
import { BusesService } from 'src/app/services/apis/Admin/buses.service';
import { DriversService } from 'src/app/services/apis/Admin/drivers.service';
import { MaterialModule } from 'src/app/material.module';
import { IconAnalyze } from 'angular-tabler-icons/icons';


@Component({
  selector: 'app-bus-edit',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, MaterialModule,],
  templateUrl: './bus-edit.component.html',
})
export class BusEditComponent implements OnInit {
  constructor(
    private tripsService: TripsService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private routesService: RoutesService,
    private busesService: BusesService,
    private driversService: DriversService,
    private router: Router,
  ) {}

  busRoute!: busRouteInterface;


  routeOptions: any[] = [];
  busesOption: any[] = [];
  driversOption: any[] = [];
  
  // Tạo form control
  routeId = new FormControl<number | null>(null, Validators.required);
  departureTime = new FormControl('', Validators.required);
  arrivalTime = new FormControl('', Validators.required);
  price = new FormControl<number | null>(null, [Validators.required, Validators.pattern('^[0-9]+$')]);
  status = new FormControl('', Validators.required);
  busID = new FormControl<number | null>(null, Validators.required);
  driverId = new FormControl<number | null>(null, Validators.required);

  ngOnInit(): void {
    this.loadOptions();

    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.tripsService.getById(id).subscribe({
        next: (res: any) => {
          this.busRoute = res.data;
          this.setFormData(this.busRoute);
        },
        error: (err) => {
          console.error('Không lấy được dữ liệu:', err);
          this.notificationService.showError('Không tìm thấy tuyến xe!');
        }
      });
    }
  }

  loadOptions() {
    this.routesService.List().subscribe({
      next: (res: any) => this.routeOptions = res.data || [],
      error: () => console.log("Lỗi khi lấy danh sách tuyến đường!")
    });

    this.busesService.List().subscribe({
      next: (res: any) => this.busesOption = res.data || [],
      error: () => console.log("Lỗi khi lấy danh sách xe!")
    });

    this.driversService.List().subscribe({
      next: (res: any) => this.driversOption = res.data || [],
      error: () => console.log("Lỗi khi lấy danh sách tài xế!")
    });
  }

  setFormData(data: busRouteInterface) {
    this.routeId.setValue(Number(data.routeId ?? null));
    this.departureTime.setValue(data.departureTime ?? '');
    this.arrivalTime.setValue(data.arrivalTime ?? '');
    this.price.setValue(Number(data.price ?? null));
    this.status.setValue(data.status ?? '');
    this.busID.setValue(data.busID ?? null);
    this.driverId.setValue(data.driverId ?? null);
  }

  onSave() {
    const controls = {
      routeId: this.routeId,
      departureTime: this.departureTime,
      arrivalTime: this.arrivalTime,
      price: this.price,
      status: this.status,
      busID: this.busID,
      driverId: this.driverId,
    };

    Object.values(controls).forEach(control => control.markAsTouched());

    if (Object.values(controls).every(control => control.valid)) {
      const updatedData: busRouteInterface = {
        id: this.busRoute.id!,
        routeId: this.routeId.value!,
        departureTime: this.departureTime.value!,
        arrivalTime: this.arrivalTime.value!,
        price: this.price.value!,
        status: this.status.value!,
        busID: this.busID.value!,
        driverId: this.driverId.value!,
      };

      this.updateRoute(updatedData);
    }
  }

  updateRoute(data: busRouteInterface) {
    this.tripsService.Update(data.id!, data).subscribe({
      next: (res) => {
        console.log('Cập nhật thành công:', res);
        this.notificationService.showSuccess('Cập nhật thành công!');
        this.router.navigate(['/admin/busGetAll']);
      },
      error: (err) => {
        console.error('Cập nhật thất bại:', err);
        this.notificationService.showError('Cập nhật thất bại!');
      }
    });
  }
}