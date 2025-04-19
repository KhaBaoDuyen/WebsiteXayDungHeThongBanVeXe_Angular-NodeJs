import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { blogInterface } from 'src/app/interface/blogInterface';
import { BlogsService } from 'src/app/services/apis/Admin/blogs.Service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './blog.component.html',
})
export class BlogComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'content', 'image', 'status', 'createAt', 'actions'];
  dataSource = new MatTableDataSource<blogInterface>([]);
  posts: blogInterface[] = [];
  categories: blogInterface[] = [];
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private blogsService: BlogsService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Phân trang theo số lượng';
  }

  fetchPosts() {
    this.blogsService.List().subscribe({
      next: (data: any) => {
        const posts = Array.isArray(data) ? data : data?.data;

        if (Array.isArray(posts)) {
          this.posts = posts;
          this.dataSource.data = [...this.posts];

          // Chia bài viết thành 2 nhóm: sortedPosts (tin mới nhất) và categories (danh mục thường)
          this.categories = [...this.posts]; // hiện tại cùng 1 dữ liệu, sau có thể tách riêng
        } else {
          console.error('❌ Dữ liệu không phải mảng:', posts);
        }
      },
      error: (err: any) => {
        console.error('❌ Lỗi lấy danh sách bài viết:', err);
      }
    });
  }

  get sortedPosts() {
    return [...this.posts].sort((a, b) => {
      const dateA = a.createAt ? new Date(a.createAt).getTime() : 0;
      const dateB = b.createAt ? new Date(b.createAt).getTime() : 0;
      return dateB - dateA;
    }).slice(0, 5); // Lấy top 5 bài mới nhất
  }

  handleSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    if (!searchTerm.trim()) {
      this.dataSource.data = [...this.posts];
    } else {
      const lower = searchTerm.toLowerCase();
      this.dataSource.data = this.posts.filter(post => {
        const title = post.title?.toLowerCase() || '';
        const content = post.content?.toLowerCase() || '';
        return title.includes(lower) || content.includes(lower);
      });
    }
  }
}
