import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripsService } from 'src/app/services/apis/Admin/trips.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RoutesService } from '../../../../../services/apis/Admin/routes.service';
import { BusesService } from '../../../../../services/apis/Admin/buses.service';
import { DriversService } from '../../../../../services/apis/Admin/drivers.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-bus-create',
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, FormsModule, NgSelectModule],
  templateUrl: './bus-create.component.html',
  standalone: true,
})
export class BusCreateComponent {
  constructor(
    private tripsService: TripsService,
    private notificationService: NotificationService,
    private routesService: RoutesService,
    private busesService: BusesService,
    private driversService: DriversService,
    private router: Router,
  ) { }
  serverError: string = '';


  routeOptions: any[] = [];
  busesOption: any[] = [];
  driversOption: any[] = [];

  route = new FormControl('', Validators.required);
  departure = new FormControl('', Validators.required);
  arrival = new FormControl('', Validators.required);
  price = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);
  busID = new FormControl('', Validators.required);
  driverID = new FormControl('', Validators.required);

  
  ngOnInit(): void {
    this.loadOptions();
  }

  loadOptions() {
    this.routesService.List().subscribe({
      next: (routes: any) => {
        console.log('Dữ liệu tuyến đường:', routes); 
        this.routeOptions = routes.data || [];
      },
      error: (err) => {
        console.log("Lỗi khi lấy danh sách tuyến đường!", err);
      }
    })

    this.busesService.List().subscribe({
      next: (buses: any) => {
        console.log('Dữ liệu xe:', buses); 
        this.busesOption = buses.data || [];
      },
      error: (err) => {
        console.log("Lỗi khi lấy danh sách xe!", err);
      }
    })

    this.driversService.List().subscribe({
      next: (drivers: any) => {
        console.log('Dữ liệu tài xế xe:', drivers); 
        this.driversOption = drivers.data || [];
      },
      error: (err) => {
        console.log("Lỗi khi lấy danh sách tài xế xe!", err);
      }
    })
  }

  onSave() {
    const controls = {
      route: this.route,
      departure: this.departure,
      price: this.price,
      busID: this.busID,
      driverID: this.driverID,
    };

    Object.values(controls).forEach(control => control.markAsTouched());

    if (Object.values(controls).every(control => control.valid)) {
      const data = {
        busID: Number(this.busID.value),
        routeId: Number(this.route.value),
        driverId: Number(this.driverID.value),
        departureTime: this.formatDateTimeForAPI(this.departure.value!),
        price: Number(this.price.value),
      };

      console.log('Dữ liệu gửi lên:', data);
      this.tripsService.Create(data).subscribe({
        next: (res) => {
          this.serverError = '';
          this.notificationService.showSuccess('Thêm tuyến xe thành công!');
          this.router.navigate(['/admin/busGetAll']);
        },
        error: (err) => {
          const message = err.error?.message || 'Thêm thất bại!';
          this.serverError = message;
          this.notificationService.showError(err.error?.message || 'Thêm thất bại!');
          console.error(err);
        }
      });
    }
  }

  private formatDateTimeForAPI(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    const pad = (num: number) => num.toString().padStart(2, '0');
    
    return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())} ` +
           `${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
  }

}
