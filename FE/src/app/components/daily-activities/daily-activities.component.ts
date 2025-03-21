import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';

interface stats {
  id: number;
  time: string;
  color: string;
  title?: string;
  subtext?: string;
  link?: string;
}

@Component({
  selector: 'app-daily-activities',
  imports: [MaterialModule],
  templateUrl: './daily-activities.component.html',
})
export class AppDailyActivitiesComponent {
  stats: stats[] = [
    {
      id: 1,
      time: '06:00 am',
      color: 'primary',
      title: 'Hà Nội - Hải Phòng',
      subtext: 'Xe giường nằm, 45 chỗ',
    },
    {
      id: 2,
      time: '07:30 am',
      color: 'warning',
      title: 'Hà Nội - Đà Nẵng',
      subtext: 'Xe giường nằm, 40 chỗ',
    },
    {
      id: 3,
      time: '09:00 am',
      color: 'secondary',
      title: 'Hà Nội - Sài Gòn',
      subtext: 'Xe ghế ngồi, 30 chỗ',
    },
    {
      id: 4,
      time: '11:00 am',
      color: 'error',
      title: 'Hà Nội - Lào Cai',
      subtext: 'Xe giường nằm, 35 chỗ',
    },
    {
      id: 5,
      time: '01:00 pm',
      color: 'primary',
      title: 'Hà Nội - Vinh',
      subtext: 'Xe ghế ngồi, 28 chỗ',
    },
    {
      id: 6,
      time: '03:00 pm',
      color: 'warning',
      title: 'Hà Nội - Quảng Ninh',
      subtext: 'Xe giường nằm, 32 chỗ',
    },
  ];
}