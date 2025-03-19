import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BusRoute } from '../../../../interface/bus-route.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bus-get-all',
  templateUrl: './bus-get-all.component.html',
  styleUrls: ['./bus-get-all.component.scss'],  
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, CommonModule, MatPaginatorModule, RouterModule],
})
export class BusGetAllComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'route', 'departure', 'arrival', 'price', 'status', 'actions'];
  dataSource = new MatTableDataSource<BusRoute>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  busRoutes: BusRoute[] = [
    { id: 1, route: 'TP.HCM - Hà Nội', departure: '06:00', arrival: '18:00', price: 500000, status: 'Đang chạy' },
    { id: 2, route: 'Đà Nẵng - Hải Phòng', departure: '08:00', arrival: '20:00', price: 450000, status: 'Sắp khởi hành' },
    { id: 3, route: 'Cần Thơ - Nha Trang', departure: '07:30', arrival: '19:00', price: 400000, status: 'Hủy' },
  ];

  constructor() {
    this.dataSource.data = this.busRoutes;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  editRoute(route: BusRoute) {
    console.log('Chỉnh sửa chuyến xe:', route);
  }

  deleteRoute(id: number) {
    this.busRoutes = this.busRoutes.filter(route => route.id !== id);
    this.dataSource.data = this.busRoutes;
  }
}


