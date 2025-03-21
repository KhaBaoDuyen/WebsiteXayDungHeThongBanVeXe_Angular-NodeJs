import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { driveriInterface } from '../../../../interface/driver.interface';
import { FormDeleteComponent } from 'src/app/components/form-delete/form-delete.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-driver-get-all',
  standalone: true,
  imports: [
    RouterModule, 
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    CommonModule, 
    MatPaginatorModule, 
    FormDeleteComponent
  ],
  templateUrl: './driver-get-all.component.html',
})

export class DriverGetAllComponent {
  displayedColumns: string[] = [
    'id', 'image', 'fullName', 'phone', 'licenseNumber', 
    'experienceYears', 'birthDate', 'status', 'createdAt', 'age', 'actions'
  ];

  dataSource = new MatTableDataSource<driveriInterface>([
    {
      id: 1,
      fullName: "Nguyễn Văn A", 
      image: "./assets/images/profile/user-6.jpg",
      phone: "0987654321",
      licenseNumber: "B123456",
      experienceYears: 5,
      birthDate: new Date("1990-05-20"),
      status: "active",
      createdAt: "2023-05-15T10:00:00",
      age: 34,
    }
  ]);

  showFormDelete = false;
  driverId: number | null = null;

  openDeleteConfirmation(driverId: number) {
    this.driverId = driverId;
    this.showFormDelete = true;
  }

  handleDeleteConfirmed() {
    if (this.driverId !== null) {
      this.dataSource.data = this.dataSource.data.filter(
        (driver) => driver.id !== this.driverId
      );
    }
    this.showFormDelete = false;
  }

  handleCancel() {
    this.showFormDelete = false;
  }
}
