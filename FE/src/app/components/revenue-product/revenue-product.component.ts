import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export interface productsData {
  id: number;
  route: string;
  departureTime: string;
  ticketPrice: number;
  seatsAvailable: number;
  revenue: number;
}

const ELEMENT_DATA: productsData[] = [
  {
    id: 1,
    route: 'Hà Nội - Hải Phòng',
    departureTime: '06:00 am',
    ticketPrice: 150000,
    seatsAvailable: 45,
    revenue: 6750000,
  },
  {
    id: 2,
    route: 'Hà Nội - Đà Nẵng',
    departureTime: '07:30 am',
    ticketPrice: 300000,
    seatsAvailable: 40,
    revenue: 12000000,
  },
  {
    id: 3,
    route: 'Hà Nội - Sài Gòn',
    departureTime: '09:00 am',
    ticketPrice: 500000,
    seatsAvailable: 30,
    revenue: 15000000,
  },
  {
    id: 4,
    route: 'Hà Nội - Lào Cai',
    departureTime: '11:00 am',
    ticketPrice: 200000,
    seatsAvailable: 35,
    revenue: 7000000,
  },
  {
    id: 5,
    route: 'Hà Nội - Vinh',
    departureTime: '01:00 pm',
    ticketPrice: 250000,
    seatsAvailable: 28,
    revenue: 7000000,
  },
  {
    id: 6,
    route: 'Hà Nội - Quảng Ninh',
    departureTime: '03:00 pm',
    ticketPrice: 180000,
    seatsAvailable: 32,
    revenue: 5760000,
  },
];

@Component({
  selector: 'app-revenue-product',
  imports: [MaterialModule, MatMenuModule, MatButtonModule, CommonModule],
  templateUrl: './revenue-product.component.html',
})
export class AppRevenueProductComponent {
  displayedColumns: string[] = ['route', 'departureTime', 'ticketPrice', 'seatsAvailable', 'revenue'];
  dataSource = ELEMENT_DATA;

  constructor() {}
}