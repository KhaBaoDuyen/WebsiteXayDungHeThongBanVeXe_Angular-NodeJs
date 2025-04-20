import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { BusTypeInterface } from 'src/app/interface/bus-type.interface';
import { FormDeleteComponent } from 'src/app/components/form-delete/form-delete.component';
import { FormSearchComponent } from '../../../../../components/form-search/form-search.component';
import { BusTypeService } from 'src/app/services/apis/Admin/bustype.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialog } from '@angular/material/dialog';

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
export class BustypeGetAllComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'typeName', 'totalSeat', 'status', 'actions'];
  dataSource = new MatTableDataSource<BusTypeInterface>();
  searchTerm: string = '';

  constructor(
    private busTypeService: BusTypeService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getList() {
    this.busTypeService.List().subscribe({
      next: (res: any) => {
        // console.log(res)
        if (res && res.data && Array.isArray(res.data)) {
          this.dataSource.data = res.data;
        } else {
          this.dataSource.data = [];
        }
      },
      error: (err: any) => {
        console.error('Error data:', err);
      }
    });
  }

  handleSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.dataSource.filter = searchTerm.trim().toLowerCase();
  }

  openDeleteDialog(id: Number): void {
    const dialogRef = this.dialog.open(FormDeleteComponent, {
      data: {
        id: id,
        service: (id: number) => this.busTypeService.Delete(Number(id)),
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Deleted category:', result);
      }
      this.getList();
    });
  }
}