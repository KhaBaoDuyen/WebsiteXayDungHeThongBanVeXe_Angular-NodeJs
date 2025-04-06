import { RoutesService } from './../../../../../services/apis/Admin/routes.service';
import { routesRoutes } from './../routes-route.routes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { LocationService } from '../../../../../services/apis/location.service';
import { Province, District, Ward } from '../../../../../services/apis/location.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MapboxService } from 'src/app/services/apis/mapbox.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-routes-create',
  templateUrl: './routes-create.component.html',
  imports: [CommonModule, ReactiveFormsModule],

})
export class RoutesCreateComponent implements OnInit {
  routesForm: FormGroup;
  provinces: Province[] = [];
  startDistricts: District[] = [];
  endDistricts: District[] = [];
  startWards: Ward[] = [];
  endWards: Ward[] = [];
  Distance: number | null = null;
  Time: number | null = null;



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private locationService: LocationService,
    private mapboxService: MapboxService,
    private routesService: RoutesService,
  ) {

  }

  ngOnInit(): void {
    this.routesForm = this.fb.group({
      startPoint: [''],
      endPoint: [''],
      startProvince: ['', Validators.required],
      startDistrict: ['', Validators.required],
      startWard: ['', Validators.required],
      endProvince: ['', Validators.required],
      endDistrict: ['', Validators.required],
      endWard: ['', Validators.required],
      distance: [{ value: '', disabled: true }],
      time: [{ value: '', disabled: true }],

    });

    this.loadProvinces();
  }
  get startProvince() { return this.routesForm.get('startProvince') as FormControl; }
  get startDistrict() { return this.routesForm.get('startDistrict') as FormControl; }
  get startWard() { return this.routesForm.get('startWard') as FormControl; }
  get endProvince() { return this.routesForm.get('endProvince') as FormControl; }
  get endDistrict() { return this.routesForm.get('endDistrict') as FormControl; }
  get endWard() { return this.routesForm.get('endWard') as FormControl; }

  loadProvinces(): void {
    this.locationService.getProvinces().subscribe((data) => {
      this.provinces = data;
    });
  }

  onStartProvinceChange(): void {
    const provinceID = this.routesForm.get('startProvince')?.value;
    if (provinceID) {
      console.log("Province ID (Điểm đi):", provinceID);
      this.locationService.getDistricts(provinceID).subscribe((districts) => {
        this.startDistricts = districts;
      });
    }
  }

  onEndProvinceChange(): void {
    const provinceID = this.routesForm.get('endProvince')?.value;
    if (provinceID) {
      console.log("Province ID (Điểm đến):", provinceID);
      this.locationService.getDistricts(provinceID).subscribe((districts) => {
        this.endDistricts = districts;
      });
    }
  }

  onStartDistrictChange(): void {
    const districtID = this.routesForm.get('startDistrict')?.value;
    if (districtID) {
      console.log("District ID (Điểm đi):", districtID);
      this.locationService.getWards(districtID).subscribe((wards) => {
        this.startWards = wards;
      });
    }
  }

  onEndDistrictChange(): void {
    const districtID = this.routesForm.get('endDistrict')?.value;
    if (districtID) {
      console.log("District ID (Điểm đến):", districtID);
      this.locationService.getWards(districtID).subscribe((wards) => {
        this.endWards = wards;
      });
    }
  }
  calculateRouteDistance() {
    const startProvince = this.provinces.find(p => p.ProvinceID == this.routesForm.value.startProvince);
    const startDistrict = this.startDistricts.find(d => d.DistrictID == this.routesForm.value.startDistrict);
    const startWard = this.startWards.find(w => w.WardCode == this.routesForm.value.startWard);
  
    const endProvince = this.provinces.find(p => p.ProvinceID == this.routesForm.value.endProvince);
    const endDistrict = this.endDistricts.find(d => d.DistrictID == this.routesForm.value.endDistrict);
    const endWard = this.endWards.find(w => w.WardCode == this.routesForm.value.endWard);
  
    if (!startProvince || !startDistrict || !startWard || !endProvince || !endDistrict || !endWard) return;
  
    const startPoint = `${startProvince.ProvinceName},${startDistrict.DistrictName},${startWard.WardName}`;
    const endPoint = `${endProvince.ProvinceName},${endDistrict.DistrictName},${endWard.WardName}`;
  
    this.mapboxService.getDistance(startPoint, endPoint).subscribe(distance => {
      
      this.routesForm.patchValue({
        distance: distance.km + ' km',
        time: distance.hours + ' giờ'
      });
  
      this.Distance = Number(distance.km);
      this.Time = Number(distance.hours);
  
      console.log("Khoảng cách:", this.Distance);
      console.log("Thời gian:", this.Time);
    });
  }

  
  onSave() {
    this.routesForm.markAllAsTouched();
    if (this.routesForm.invalid) return;

    const startProvince = this.provinces.find(p => p.ProvinceID == this.routesForm.value.startProvince);
    const startDistrict = this.startDistricts.find(d => d.DistrictID == this.routesForm.value.startDistrict);
    const startWard = this.startWards.find(w => w.WardCode == this.routesForm.value.startWard);

    const endProvince = this.provinces.find(p => p.ProvinceID == this.routesForm.value.endProvince);
    const endDistrict = this.endDistricts.find(d => d.DistrictID == this.routesForm.value.endDistrict);
    const endWard = this.endWards.find(w => w.WardCode == this.routesForm.value.endWard);

    if (!startProvince || !startDistrict || !startWard || !endProvince || !endDistrict || !endWard) {
      this.notificationService.showError('Vui lòng chọn đầy đủ thông tin');
      return;
    }

    if (this.Distance == null || this.Time == null) {
      this.notificationService.showError('Vui lòng tính khoảng cách trước khi lưu');
      return;
    }

    const startPoint = `${startProvince.ProvinceName},${startDistrict.DistrictName},${startWard.WardName}`;
    const endPoint = `${endProvince.ProvinceName},${endDistrict.DistrictName},${endWard.WardName}`;

    const routeData = {
      startPoint: startPoint.trim(),
      endPoint: endPoint.trim(),
      distance: this.Distance,
      time: this.Time
    };

    this.routesService.Create(routeData).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.notificationService.showSuccess(res.message);
        } else {
          this.notificationService.showError(res.message || 'Đã xảy ra lỗi không xác định');
        }
      },
      error: (err: any) => {
        this.notificationService.showError(err.error?.message || err.message || 'Lỗi không xác định');
      }
    });
  }


}
