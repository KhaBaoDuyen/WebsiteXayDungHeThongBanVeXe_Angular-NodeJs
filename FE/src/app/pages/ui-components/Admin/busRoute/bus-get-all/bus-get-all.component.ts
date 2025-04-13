import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule, Router } from '@angular/router';
import { FormDeleteComponent } from 'src/app/components/form-delete/form-delete.component';
import { busRouteInterface } from '../../../../../interface/bus-route.interface';
import { FormSearchComponent } from '../../../../../components/form-search/form-search.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { TripsService } from '../../../../../services/apis/Admin/trips.service';


@Component({
  selector: 'app-bus-get-all',
  templateUrl: './bus-get-all.component.html',
  standalone: true,
  imports: [
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    CommonModule, 
    MatPaginatorModule, 
    RouterModule,
    FormDeleteComponent,
    FormSearchComponent,
    
  ]
})
export class BusGetAllComponent implements OnInit {
  displayedColumns: string[] = ['id', 'routeId', 'busID', 'driverId', 'departureTime', 'arrivalTime', 'status', 'actions'];
  dataSource = new MatTableDataSource<busRouteInterface>([]);

  showDeleteConfirmation = false; 
  selectedRouteId: number | null = null; 

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private tripsService: TripsService,
    
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
        (route.routeId && route.routeId.toString().includes(searchTerm.toLowerCase())) || 
        (route.busID && route.busID.toString().includes(searchTerm.toLowerCase())) ||
        (route.driverId && route.driverId.toString().includes(searchTerm.toLowerCase()))
      );
    }
  }
  

  getList() {
    this.tripsService.List().subscribe({
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
           service: (id: number) =>this.tripsService.Delete(Number(id)), }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result) {
          console.log('Deleted category:', result);
        }
        this.getList();
      });
    }
}


