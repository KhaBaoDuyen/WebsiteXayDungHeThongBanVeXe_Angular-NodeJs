import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { blogInterface } from 'src/app/interface/blogInterface';
import { FormSearchComponent } from '../../../../../components/form-search/form-search.component';
import { BlogsService } from 'src/app/services/apis/Admin/blogs.Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blog-get-all',
  templateUrl: './blog-get-all.component.html',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatPaginatorModule,
    RouterModule,
    FormSearchComponent,
  ],
})
export class BlogGetAllComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'title', 'content', 'image', 'status', 'createAt', 'actions'];
  dataSource = new MatTableDataSource<blogInterface>([]);
  posts: blogInterface[] = [];
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
        // console.log('✅ Dữ liệu nhận được từ API:', data);

        // Nếu backend trả về dạng { status, data }, bạn cần truy cập data.data
        const posts = Array.isArray(data) ? data : data?.data;

        if (Array.isArray(posts)) {
          this.posts = posts;
          this.dataSource.data = [...this.posts];
        } else {
          console.error('❌ Dữ liệu không phải mảng:', posts);
        }
      },
      error: (err: any) => {
        console.error('❌ Lỗi lấy danh sách bài viết:', err);
      }
    });
  }

  deletePost(id: number) {
    Swal.fire({
      title: 'Bạn có chắc muốn xóa?',
      text: 'Hành động này không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#e3342f',
      cancelButtonColor: '#6c757d'
    }).then(result => {
      if (result.isConfirmed) {
        this.blogsService.Delete(id).subscribe({
          next: () => {
            this.posts = this.posts.filter(post => post.id !== id);
            this.dataSource.data = [...this.posts];
            Swal.fire('Đã xóa!', 'Bài viết đã được xóa thành công.', 'success');
          },
          error: (err: any) => {
            console.error('❌ Lỗi khi xóa bài viết:', err);
            Swal.fire('Lỗi!', 'Không thể xóa bài viết.', 'error');
          }
        });
      }
    });
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
