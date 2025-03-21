import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { busesInterface } from '../../../../interface/buses.interface';
import { RouterModule } from '@angular/router';
import { FormDeleteComponent } from 'src/app/components/form-delete/form-delete.component';


@Component({
  selector: 'app-buses-get-all',
  imports: [
    RouterModule, 
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    CommonModule, 
    MatPaginatorModule,
    FormDeleteComponent,

  ],
  templateUrl: './buses-get-all.component.html',
  styleUrl: './buses-get-all.component.scss'
})
export class BusesGetAllComponent implements AfterViewInit {
displayedColumns: string[] = ['id', 'plateNumber', 'busTypeID', 'driverId','totalSeats','seatsId','status','actions'];
  dataSource = new MatTableDataSource<busesInterface>([
    {
      id: 1,
      plateNumber: "51A-12345",
      busTypeID: 1,
      driverId: 1,
      status: 'active',
      totalSeats: 40,
      seatsId: 1
    },
    {
      id: 2,
      plateNumber: "51A-12346",
      busTypeID: 2,
      driverId: 2,
      status: 'inactive',
      totalSeats: 30,
      seatsId: 2
    },
    {
      id: 3,
      plateNumber: "51A-12334",
      busTypeID: 3,
      driverId: 3,
      status: 'inactive',
      totalSeats: 30,
      seatsId: 3
    },
  ]);

  showDeleteConfirmation = false; 
  selectedBusesId: number | null = null; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // Mở form xác nhận xóa
  openDeleteConfirmation(BusesId: number) {
    this.selectedBusesId = BusesId;
    this.showDeleteConfirmation = true;
  }

  // Xử lý khi xác nhận xóa
  handleDeleteConfirmed() {
    if (this.selectedBusesId !== null) {
      this.dataSource.data = this.dataSource.data.filter(
        (buses) => buses.id !== this.selectedBusesId
      );
    }
    this.showDeleteConfirmation = false; 
  }

  handleCancel() {
    this.showDeleteConfirmation = false; 
  }
}
