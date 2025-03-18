import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Injectable } from '@angular/core';

export interface Review {
  id: number;
  userID: number;
  tripID: number;
  rating: number;
  comment: string;
  createAt: Date;
  updateAt: Date;
  image?: string;
  status: string;
}

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Phân trang theo số lượng:';
}

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }]
})
export class ReviewComponent {
  displayedColumns: string[] = ['id', 'userID', 'tripID', 'rating', 'comment', 'image', 'status', 'createAt'];
  dataSource = new MatTableDataSource<Review>([
    { id: 1, userID: 101, tripID: 501, rating: 5, comment: "Tuyệt vời!", createAt: new Date(), updateAt: new Date(), image: 'https://via.placeholder.com/50', status: 'active' },
    { id: 2, userID: 102, tripID: 502, rating: 4, comment: "Dịch vụ tốt", createAt: new Date(), updateAt: new Date(), status: 'inactive' },
    { id: 3, userID: 103, tripID: 503, rating: 3, comment: "Ổn", createAt: new Date(), updateAt: new Date(), image: 'https://via.placeholder.com/50', status: 'active' },
    { id: 4, userID: 104, tripID: 504, rating: 2, comment: "Cần cải thiện", createAt: new Date(), updateAt: new Date(), status: 'inactive' },
    { id: 5, userID: 105, tripID: 505, rating: 1, comment: "Không hài lòng", createAt: new Date(), updateAt: new Date(), image: 'https://via.placeholder.com/50', status: 'active' }
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
