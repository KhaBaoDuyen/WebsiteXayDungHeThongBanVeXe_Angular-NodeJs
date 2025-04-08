import { ContactService } from './../../../../../services/apis/Admin/contact.service';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { contactInterface } from 'src/app/interface/contact.Interface';
import { FormSearchComponent } from '../../../../../components/form-search/form-search.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { FormDeleteComponent } from 'src/app/components/form-delete/form-delete.component';

@Component({
  selector: 'app-contact-get-all',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterModule,
    FormSearchComponent,
    MatTabsModule,
  ],
  templateUrl: './contact-get-all.component.html',
})
export class ContactGetAllComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['stt', 'question', 'email', 'status', 'actions'];
  dataSource = new MatTableDataSource<contactInterface>();
  originalData: contactInterface[] = [];
  searchTerm: string = '';
  statusFilter: number = 0;
  isAnsweredTab = false;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private dialog: MatDialog,
    private notificationService: NotificationService,
  ) {
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getData() {
    this.contactService.List().subscribe({
      next: (res: any) => {
        console.log(' API ===', res);
        this.originalData = res?.data ?? [];
        this.applyFilters();
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy dữ liệu:', err);
      }
    });
  }

  handleSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  onTabChange(event: MatTabChangeEvent) {
    this.statusFilter = event.index === 1 ? 1 : 0;
    this.applyFilters();
  }

  applyFilters() {
    let filteredData = this.originalData;
    if (this.statusFilter !== -1) {
      filteredData = filteredData.filter(contact => contact.status === this.statusFilter);
    }
  
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filteredData = filteredData.filter(contact =>
        (contact.question?.toLowerCase().includes(term) || '') ||
        (contact.email?.toLowerCase().includes(term) || '')
      );
    }
  
    this.dataSource.data = filteredData;
  
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }
  

  openDeleteDialog(id: Number): void {
    const dialogRef = this.dialog.open(FormDeleteComponent, {
      data: { id: id,
         service: (id: number) =>this.contactService.Delete(Number(id)), }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        console.log('Deleted category:', result);
      }
      this.getData();
    });
  }


}
