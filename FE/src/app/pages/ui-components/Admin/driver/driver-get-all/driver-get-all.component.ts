import { DriverService } from '../../../../../services/apis/Admin/driver.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormDeleteComponent } from 'src/app/components/form-delete/form-delete.component';
import { RouterModule } from '@angular/router';
import { driveriInterface } from 'src/app/interface/driver.interface';
import { FormSearchComponent } from '../../../../../components/form-search/form-search.component';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialog } from '@angular/material/dialog';

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
    FormDeleteComponent,
    FormSearchComponent,
  ],
  templateUrl: './driver-get-all.component.html',
})

export class DriverGetAllComponent {
  [x: string]: any;
  searchTerm: string = '';
  showFormDelete = false;
  driverId: number | null = null;
  constructor(
    private driverService: DriverService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    

  ) {
    this.getList();
  }
  displayedColumns: string[] = [
    'id', 'avatar', 'fullName', 'phone', 'licenseNumber',
    'experienceYears', 'YearBirthDate', 'status', 'actions'
  ];

  dataSource = new MatTableDataSource<driveriInterface>([]);

  getList() {
    this.driverService.List().subscribe({
      next: (res: any) => {
        this.dataSource._updateChangeSubscription();
        this.dataSource.data = res?.data ?? [];
        console.log(this.dataSource.data);
      },
      error: (err: any) => {
        console.error('Loi khi lay dulieu:', err);
      }
    });
  }


  openDeleteDialog(id: Number): void {
    const dialogRef = this.dialog.open(FormDeleteComponent, {
      data: { id: id,
         service: (id: number) =>this.driverService.Delete(Number(id)), }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Deleted :', result);
      }
      this.getList();
    });
  }
  handleCancel() {
    this.showFormDelete = false;
  }
  handleSearch(searchTerm: string) {
    this.searchTerm = searchTerm;

   
  }
}
