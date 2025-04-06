import { RoutesService } from './../../../../../services/apis/Admin/routes.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { LocationService } from '../../../../../services/apis/location.service';
import { Province, District, Ward } from '../../../../../services/apis/location.service';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { MapboxService } from 'src/app/services/apis/mapbox.service';

@Component({
  selector: 'app-routes-edit',
  templateUrl: './routes-edit.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class RoutesEditComponent implements OnInit {
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
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private locationService: LocationService,
    private mapboxService: MapboxService,
    private routesService: RoutesService
  ) { }

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    this.cdr.markForCheck();

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

    if (routeId) {
      this.getRouteData(Number(routeId));
    }
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

  setFormData(routeData: any): void {
    this.routesForm.patchValue({
      startProvince: routeData.startProvinceID,
      startDistrict: routeData.startDistrictID,
      startWard: routeData.startWardID,
      endProvince: routeData.endProvinceID,
      endDistrict: routeData.endDistrictID,
      endWard: routeData.endWardID,
      distance: routeData.distance,
      time: routeData.time,
    });

    this.onStartProvinceChange();
    this.onEndProvinceChange();
    this.onStartDistrictChange();
    this.onEndDistrictChange();
  }

  onStartProvinceChange(): void {
    const provinceID = this.routesForm.get('startProvince')?.value;
    if (provinceID) {
      this.locationService.getDistricts(provinceID).subscribe((districts) => {
        this.startDistricts = districts;
      });
    }
  }

  onEndProvinceChange(): void {
    const provinceID = this.routesForm.get('endProvince')?.value;
    if (provinceID) {
      this.locationService.getDistricts(provinceID).subscribe((districts) => {
        this.endDistricts = districts;
      });
    }
  }

  onStartDistrictChange(): void {
    const districtID = this.routesForm.get('startDistrict')?.value;
    if (districtID) {
      this.locationService.getWards(districtID).subscribe((wards) => {
        this.startWards = wards;
      });
    }
  }

  onEndDistrictChange(): void {
    const districtID = this.routesForm.get('endDistrict')?.value;
    if (districtID) {
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
    });
  }

  onUpdate(): void {
    this.routesForm.markAllAsTouched();
    const routeId = this.route.snapshot.paramMap.get('id');
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

    const startPoint = `${startProvince.ProvinceName},${startDistrict.DistrictName},${startWard.WardName}`;
    const endPoint = `${endProvince.ProvinceName},${endDistrict.DistrictName},${endWard.WardName}`;

    const routeData = {
      startProvinceID: startProvince.ProvinceID,
      startDistrictID: startDistrict.DistrictID,
      startWardID: startWard.WardCode,
      endProvinceID: endProvince.ProvinceID,
      endDistrictID: endDistrict.DistrictID,
      endWardID: endWard.WardCode,
      startPoint: startPoint.trim(),
      endPoint: endPoint.trim(),
      distance: this.Distance,
      time: this.Time
    };

    this.routesService.Update(Number(routeId), routeData).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.setFormData(res.routes);
          this.notificationService.showSuccess(res.message || 'Cập nhật thành công');
          this.router.navigate(['/admin/routesGetAll']);

        } else {
          this.notificationService.showError(res.message || 'Không thể cập nhật route');
        }
      },
      error: (err: any) => {
        console.error('API Error:', err);
        this.notificationService.showError(err.error?.message || err.message || 'Lỗi không xác định');
      }
    });
  }

  getRouteData(id: number): void {
    this.routesService.getRoutesById(id).subscribe({
      next: (res: any) => {
        console.log('API Response:', res);
        if (res.success) {
          this.setFormData(res.data);
        } else {
          this.notificationService.showError(res.message || 'Không thể lấy dữ liệu route');
        }
      },
      error: (err: any) => {
        console.error('API Error:', err);
        this.notificationService.showError(err.error?.message || err.message || 'Lỗi không xác định');
      }
    });
  }

}
