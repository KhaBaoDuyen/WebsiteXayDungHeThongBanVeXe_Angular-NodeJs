import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule, Router } from '@angular/router';
import { FormDeleteComponent } from 'src/app/components/form-delete/form-delete.component';
import { busesInterface } from 'src/app/interface/buses.interface';
import { FormSearchComponent } from '../../../../../components/form-search/form-search.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { BusesService } from '../../../../../services/apis/Admin/buses.service';


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
    FormSearchComponent,
  ],
  templateUrl: './buses-get-all.component.html',
})
export class BusesGetAllComponent implements OnInit {
displayedColumns: string[] = ['id', 'plateNumber', 'busTypeID','totalSeats','status','actions'];
  dataSource = new MatTableDataSource<busesInterface>([]);

  showDeleteConfirmation = false; 
  selectedBusesId: number | null = null; 

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private busesService: BusesService,
    
  ) {
    this.getList();
  }

  ngOnInit(): void {
    this.getList();
  }


  handleSearch(searchTerm: string) {
    if (!searchTerm.trim()) {
      this.getList();
    } else {
      this.dataSource.data = this.dataSource.data.filter(route =>
        (route.busTypeId && route.busTypeId.toString().includes(searchTerm.toLowerCase()))
      );
    }
  }
  

  getList() {
    this.busesService.List().subscribe({
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

  openEditForm(routeId: number) {
    this.router.navigate([`/routes/list/`, routeId]);
  }

   openDeleteDialog(id: Number): void {
      const dialogRef = this.dialog.open(FormDeleteComponent, {
        data: { id: id,
           service: (id: number) =>this.busesService.Delete(Number(id)), }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result) {
          console.log('Deleted category:', result);
        }
        this.getList();
      });
    }

  /* handleSearch(searchTerm: string) {
    this.searchTerm = searchTerm; 

    if (!searchTerm.trim()) {
      this.dataSource.data = [
        {
          id: 1,
          plateNumber: "51A-12345",
          busTypeID: 1, //hiển thị tên loại xe
          driverId: 1,   //hiển thị tên tài xế
          status: 'active',
          totalSeats: 40   
        },
        {
          id: 2,
          plateNumber: "51A-12346",
          busTypeID: 2,
          driverId: 2,
          status: 'inactive',
          totalSeats: 30
        },
        {
          id: 3,
          plateNumber: "51A-12334",
          busTypeID: 3,
          driverId: 3,
          status: 'inactive',
          totalSeats: 30
        },
      ];
    } else {
      this.dataSource.data = this.dataSource.data.filter(route =>
        route.plateNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  } */
}
