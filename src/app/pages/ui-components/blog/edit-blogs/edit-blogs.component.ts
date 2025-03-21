import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { blogInterface } from 'src/app/interface/blogInterface';

@Component({
  selector: 'app-edit-blogs',
  templateUrl: './edit-blogs.component.html',
  styleUrls: ['./edit-blogs.component.scss'],
  imports: [CommonModule],
})
export class EditBlogsComponent {
  blog: blogInterface = {
    id: 1,
    title: 'Cách học Angular hiệu quả',
    content: 'Bài viết này hướng dẫn cách học Angular từ cơ bản đến nâng cao.',
    image: 'assets/images/blog-1.jpg',
    status: 'active',
    createAt: '2024-03-21'
  };
}
