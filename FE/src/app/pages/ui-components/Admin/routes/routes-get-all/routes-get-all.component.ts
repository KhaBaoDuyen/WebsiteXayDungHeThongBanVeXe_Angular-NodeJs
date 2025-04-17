import { routes } from './../../../../../app.routes';
import { UserCreateComponent } from './../../users/user-create/user-create.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { FormDeleteComponent } from 'src/app/components/form-delete/form-delete.component';
import { routesInterface } from 'src/app/interface/routes.interface';
import { FormSearchComponent } from '../../../../../components/form-search/form-search.component';
import { RoutesService } from '../../../../../services/apis/Admin/routes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-routes-get-all',
  standalone: true,
  imports: [RouterModule, 
    MatTableModule, 
    MatButtonModule, 
    MatIconModule,
    CommonModule, 
    MatPaginatorModule, 
    FormDeleteComponent, 
    FormSearchComponent],
  templateUrl: './routes-get-all.component.html',
})
export class RoutesGetAllComponent implements OnInit {
  [x: string]: any;
  displayedColumns: string[] = ['id', 'startPoint', 'endPoint', 'distance', 'time', 'actions'];

  dataSource = new MatTableDataSource<routesInterface>([]);

  showFormDelete = false;
  driverId: number | null = null;

  // editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private routesService: RoutesService,
    
  ) {
    // this.editForm = this.fb.group({
    //   id: [null],
    //   name: ['', Validators.required],
    //   description: ['', Validators.required]
    // });
    this.getList();
  }

  ngOnInit(): void {
    this.getList();
  }


  handleSearch(searchTerm: string) {
    if (!searchTerm.trim()) {
      this.getList();
    } else {
      const keyword = searchTerm.trim().toLowerCase();
      this.dataSource.data = this.dataSource.data.filter(trip =>
        (trip.startPoint?.toLowerCase().includes(keyword)) ||
        (trip.endPoint?.toLowerCase().includes(keyword))
      );
    }
  }
  



  getList() {
    this.routesService.List().subscribe({
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
           service: (id: number) =>this.routesService.Delete(Number(id)), }
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
