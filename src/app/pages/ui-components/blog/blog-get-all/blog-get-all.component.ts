import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

import { blogInterface } from 'src/app/interface/blogInterface';

@Component({
  selector: 'app-blog-get-all',
  templateUrl: './blog-get-all.component.html',
  styleUrls: ['./blog-get-all.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, CommonModule, MatPaginatorModule, RouterModule],
})
export class BlogGetAllComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'content', 'image', 'status', 'createAt', 'actions'];
  dataSource = new MatTableDataSource<blogInterface>([]);
  posts: blogInterface[] = [
    { id: 1, title: 'Bài viết 1', content: 'Nội dung bài viết 1', image: 'https://source.unsplash.com/random/150x100?sig=1', status: 'hiện', createAt: '2024-03-18' },
    { id: 2, title: 'Bài viết 2', content: 'Nội dung bài viết 2', image: 'https://source.unsplash.com/random/150x100?sig=2', status: 'hiện', createAt: '2024-03-17' },
    { id: 3, title: 'Bài viết 3', content: 'Nội dung bài viết 3', image: 'https://source.unsplash.com/random/150x100?sig=3', status: 'ẩn', createAt: '2024-03-16' },
    { id: 4, title: 'Bài viết 4', content: 'Nội dung bài viết 4', image: 'https://source.unsplash.com/random/150x100?sig=4', status: 'hiện', createAt: '2024-03-15' },
    { id: 5, title: 'Bài viết 5', content: 'Nội dung bài viết 5', image: 'https://source.unsplash.com/random/150x100?sig=5', status: 'ẩn', createAt: '2024-03-14' },
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.dataSource.data = this.posts;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Phân trang theo số lượng';
  }

  editPost(post: blogInterface) {
    console.log('Chỉnh sửa bài viết:', post);
  }

  deletePost(id: number) {
    this.posts = this.posts.filter(post => post.id !== id);
    this.dataSource.data = this.posts;
  }
}
