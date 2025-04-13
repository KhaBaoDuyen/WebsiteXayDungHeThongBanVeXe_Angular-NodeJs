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
 
@Component({
  selector: 'app-bus-create',
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, FormsModule],
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

  routeOptions: any[] = [];
  busesOption: any[] = [];
  driversOption: any[] = [];

  route = new FormControl('', Validators.required);
  departure = new FormControl('', Validators.required);
  arrival = new FormControl('', Validators.required);
  price = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);
  status = new FormControl('', Validators.required);
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
      arrival: this.arrival,
      price: this.price,
      status: this.status,
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
        arrivalTime: this.formatDateTimeForAPI(this.arrival.value!),
        price: Number(this.price.value),
        status: this.status.value!
      };

      console.log('Dữ liệu gửi lên:', data);
      this.tripsService.Create(data).subscribe({
        next: (res) => {
          this.notificationService.showSuccess('Thêm tuyến xe thành công!');
          this.router.navigate(['/admin/busGetAll']);
        },
        error: (err) => {
          this.notificationService.showError('Thêm thất bại!');
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
