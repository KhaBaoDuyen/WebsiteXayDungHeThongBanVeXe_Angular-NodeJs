import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { FormDeleteComponent } from 'src/app/components/form-delete/form-delete.component';
import { routesInterface } from 'src/app/interface/routes.interface';
import { FormSearchComponent } from '../../../../../components/form-search/form-search.component';

@Component({
  selector: 'app-routes-get-all',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatIconModule, 
    CommonModule, MatPaginatorModule, FormDeleteComponent, FormSearchComponent],
  templateUrl: './routes-get-all.component.html',
})
export class RoutesGetAllComponent {
  displayedColumns: string[] = ['id', 'startPoint', 'endPoint', 'distance', 'actions'];
  
  originalData: routesInterface[] = [
    {
      id: 1,
      startPoint: "Hà Nội",
      endPoint: "Hồ Chí Minh",
      distance: 2000
    },
    {
      id: 6,
      startPoint: "An Giang",
      endPoint: "Bà Rịa - Vũng Tàu",
      distance: 140
    },
  ];
  
  dataSource = new MatTableDataSource<routesInterface>([...this.originalData]);

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

  handleSearch(searchTerm: string) {
    if (!searchTerm.trim()) {
      this.dataSource.data = [...this.originalData];
    } else {
      this.dataSource.data = this.originalData.filter(route => 
        route.startPoint.toLowerCase().includes(searchTerm.toLowerCase()) || 
        route.endPoint.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }
}
