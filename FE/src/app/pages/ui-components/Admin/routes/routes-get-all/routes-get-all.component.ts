import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
 import { RouterModule } from '@angular/router';
import { FormDeleteComponent } from 'src/app/components/form-delete/form-delete.component';
import { routesInterface } from 'src/app/interface/routes.interface';


@Component({
  selector: 'app-routes-get-all',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatIconModule, 
CommonModule, MatPaginatorModule, FormDeleteComponent],
  templateUrl: './routes-get-all.component.html',
  styleUrl: './routes-get-all.component.scss'
})
export class RoutesGetAllComponent {
displayedColumns: string[] = ['id', 'startPoint', 'endPoint', 'distance','actions'];
  dataSource = new MatTableDataSource<routesInterface>([
    {
      id: 1,
      startPoint: "Hà Nội",
      endPoint: "Hồ Chí Minh",
      distance: 2000
    },
    {
      id: 2,
      startPoint: "An Giang",
      endPoint: "Bà Rịa - Vũng Tàu",
      distance: 140
    },
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
