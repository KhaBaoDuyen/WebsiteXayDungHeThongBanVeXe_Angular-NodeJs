import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { FormDeleteComponent } from 'src/app/components/form-delete/form-delete.component';
import { BusRoute } from 'src/app/interface/bus-route.interface';
import { FormSearchComponent } from '../../../../../components/form-search/form-search.component';

@Component({
  selector: 'app-bus-get-all',
  templateUrl: './bus-get-all.component.html',
  standalone: true,
  imports: [
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    CommonModule, 
    MatPaginatorModule, 
    RouterModule,
    FormDeleteComponent,
    FormSearchComponent,
  ]
})
export class BusGetAllComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'route', 'busID', 'driverID', 'departure', 'arrival', 'price', 'status', 'actions'];
  dataSource = new MatTableDataSource<BusRoute>([
    { id: 1, route: 'TP.HCM - Hà Nội', departure: '06:00', arrival: '18:00', price: 500000, status: 'Đang chạy', busID: 1, driverID: 1 },
    { id: 2, route: 'Đà Nẵng - Hải Phòng', departure: '08:00', arrival: '20:00', price: 450000, status: 'Sắp khởi hành', busID: 1, driverID: 1 },
    { id: 3, route: 'Cần Thơ - Nha Trang', departure: '07:30', arrival: '19:00', price: 400000, status: 'Hủy', busID: 1, driverID: 1 },
    { id: 4, route: 'Đà Nẵng - Hải Phòng', departure: '10:00', arrival: '22:00', price: 600000, status: 'Đang điều hành', busID: 2, driverID: 2 },
    { id: 5, route: 'TP.HCM - Hà Nội', departure: '12:00', arrival: '24:00', price: 550000, status: 'Đang điều hành', busID: 2, driverID: 2 },
  ]);
  searchTerm: string = '';




  showDeleteConfirmation = false; 
  selectedRouteId: number | null = null; 
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // Mở form xác nhận xóa
  openDeleteConfirmation(RouteId: number) {
    this.selectedRouteId = RouteId;
    this.showDeleteConfirmation = true;
  }

  // Xử lý khi xác nhận xóa
  handleDeleteConfirmed() {
    if (this.selectedRouteId !== null) {
      this.dataSource.data = this.dataSource.data.filter(
        (route) => route.id !== this.selectedRouteId
      );
    }
    this.showDeleteConfirmation = false; 
  }

  handleCancel() {
    this.showDeleteConfirmation = false; 
  }

  handleSearch(searchTerm: string) {
    this.searchTerm = searchTerm; 

    if (!searchTerm.trim()) {
      this.dataSource.data = [
        { id: 1, route: 'TP.HCM - Hà Nội', departure: '06:00', arrival: '18:00', price: 500000, status: 'Đang chạy', busID: 1, driverID: 1 },
        { id: 2, route: 'Đà Nẵng - Hải Phòng', departure: '08:00', arrival: '20:00', price: 450000, status: 'Sắp khởi hành', busID: 1, driverID: 1 },
        { id: 3, route: 'Cần Thơ - Nha Trang', departure: '07:30', arrival: '19:00', price: 400000, status: 'Hủy', busID: 1, driverID: 1 },
        { id: 4, route: 'Đà Nẵng - Hải Phòng', departure: '10:00', arrival: '22:00', price: 600000, status: 'Đang điều hành', busID: 2, driverID: 2 },
        { id: 5, route: 'TP.HCM - Hà Nội', departure: '12:00', arrival: '24:00', price: 550000, status: 'Đang điều hành', busID: 2, driverID: 2 },
      ];
    } else {
      this.dataSource.data = this.dataSource.data.filter(route =>
        route.route.toString().includes(searchTerm.toLowerCase()) ||
        route.departure.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.arrival.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.busID.toString().includes(searchTerm) ||
        route.driverID.toString().includes(searchTerm)
      );
    }
  }
}


