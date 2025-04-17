import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule, Router } from '@angular/router';
import { userInterface } from 'src/app/interface/user.interface';
import { FormDeleteComponent } from 'src/app/components/form-delete/form-delete.component';
import { FormSearchComponent } from '../../../../../components/form-search/form-search.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { UsersService } from '../../../../../services/apis/Admin/users.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
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
export class AdminUsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'image', 'fullName', 'email', 'phone', 'role', 'status', 'actions'];
  dataSource = new MatTableDataSource<userInterface>([]);

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private dialog: MatDialog,
      private notificationService: NotificationService,
      private usersService: UsersService,
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
          (route.fullName && route.fullName.toString().includes(searchTerm.toLowerCase()))
        );
      }
    }
    
  
    getList() {
      this.usersService.List().subscribe({
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
             service: (id: number) =>this.usersService.Delete(Number(id)), }
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

