import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { routesInterface } from '../../../../interface/routes.interface';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-routes-get-all',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatIconModule, CommonModule, MatPaginatorModule],
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
      distance: "2000 km"
    },
    {
      id: 2,
      startPoint: "An Giang",
      endPoint: "Bà Rịa - Vũng Tàu",
      distance: "140 km"
    },
  ]);
}
