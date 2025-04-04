import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Injectable } from '@angular/core';
import { reviewInterface } from 'src/app/interface/reviewInterface';
import { RouterModule } from '@angular/router';
import { FormSearchComponent } from '../../../../components/form-search/form-search.component';



@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Phân trang theo số lượng:';
}

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, RouterModule, FormSearchComponent,],
  templateUrl: './review.component.html',
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }]
})
export class ReviewComponent {
  displayedColumns: string[] = ['id', 'userID', 'tripID', 'rating', 'comment', 'status', 'createAt', 'actions'];

  originalData: reviewInterface[] = [
    { id: 1, userID: 101, tripID: 501, rating: 5, comment: "Tuyệt vời!", createAt: new Date(), updateAt: new Date(), image: 'https://via.placeholder.com/50', status: 'active' },
    { id: 2, userID: 102, tripID: 502, rating: 4, comment: "Dịch vụ tốt", createAt: new Date(), updateAt: new Date(), status: 'inactive' },
    { id: 3, userID: 103, tripID: 503, rating: 3, comment: "Ổn", createAt: new Date(), updateAt: new Date(), image: 'https://via.placeholder.com/50', status: 'active' },
    { id: 4, userID: 104, tripID: 504, rating: 2, comment: "Cần cải thiện", createAt: new Date(), updateAt: new Date(), status: 'inactive' },
    { id: 5, userID: 105, tripID: 505, rating: 1, comment: "Không hài lòng", createAt: new Date(), updateAt: new Date(), image: 'https://via.placeholder.com/50', status: 'active' }
  ];

  dataSource = new MatTableDataSource<reviewInterface>(this.originalData); 
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  handleSearch(searchTerm: string) {
    this.searchTerm = searchTerm;

    if (!searchTerm.trim()) {
      this.dataSource.data = this.originalData;
    } else {
      this.dataSource.data = this.originalData.filter(route =>
        route.userID.toString().includes(searchTerm) ||
        route.tripID.toString().includes(searchTerm)
      );
    }
  }
}
