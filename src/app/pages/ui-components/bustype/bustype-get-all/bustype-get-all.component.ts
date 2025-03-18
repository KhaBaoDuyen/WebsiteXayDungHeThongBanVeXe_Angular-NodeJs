import { BusTypeInterface } from 'src/app/interface/bus-type.interface';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bustype-get-all',
  standalone: true,
  templateUrl: './bustype-get-all.component.html',
  styleUrls: ['./bustype-get-all.component.scss'],
  imports: [MatTableModule, MatButtonModule, MatIconModule, CommonModule, MatPaginatorModule, RouterModule],
})
export class BustypeGetAllComponent {
  displayedColumns: string[] = ['id', 'name', 'status', 'actions'];
  dataSource = new MatTableDataSource<BusTypeInterface>([
    { id: 1, name: "Xe Buýt Thành Phố", status: "active" },
    { id: 2, name: "Xe Buýt Cao Cấp", status: "inactive" }
  ]);
}
