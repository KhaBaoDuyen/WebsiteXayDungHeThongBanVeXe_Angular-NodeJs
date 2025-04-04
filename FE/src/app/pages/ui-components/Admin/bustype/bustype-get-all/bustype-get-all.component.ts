import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { BusTypeInterface } from 'src/app/interface/bus-type.interface';
import { FormDeleteComponent } from 'src/app/components/form-delete/form-delete.component';
import { FormSearchComponent } from '../../../../../components/form-search/form-search.component';

@Component({
  selector: 'app-bustype-get-all',
  standalone: true,
  templateUrl: './bustype-get-all.component.html',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatPaginatorModule,
    RouterModule,
    FormDeleteComponent, 
    FormSearchComponent,
  ],
})
export class BustypeGetAllComponent {
  displayedColumns: string[] = ['id', 'name', 'status', 'actions'];
  dataSource = new MatTableDataSource<BusTypeInterface>([
    { id: 1, name: 'Xe Buýt Thành Phố', status: 'active' },
    { id: 2, name: 'Xe Buýt Cao Cấp', status: 'inactive' },
  ]);
  searchTerm: string = '';

  showFormDelete = false; 
  busTypeId: number | null = null;

  openDeleteConfirmation(busTypeId: number) {
    this.busTypeId = busTypeId;
    this.showFormDelete = true;
  }

  handleDeleteConfirmed() {
    if (this.busTypeId !== null) {
      this.dataSource.data = this.dataSource.data.filter(
        (driver) => driver.id !== this.busTypeId
      );
    }
    this.showFormDelete = false;
  }

  handleCancel() {
    this.showFormDelete = false;
  }

  handleSearch(searchTerm: string) {
    this.searchTerm = searchTerm; 

    if (!searchTerm.trim()) {
      this.dataSource.data = [
        { id: 1, name: 'Xe Buýt Thành Phố', status: 'active' },
        { id: 2, name: 'Xe Buýt Cao Cấp', status: 'inactive' },
      ];
    } else {
      this.dataSource.data = this.dataSource.data.filter(route =>
        route.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }
}