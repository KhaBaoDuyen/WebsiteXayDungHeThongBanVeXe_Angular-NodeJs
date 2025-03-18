import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-reply',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './contact-reply.component.html',
  styleUrls: ['./contact-reply.component.scss']
})
export class ContactReplyComponent implements OnInit {
  replyForm: FormGroup;
  questionId: number;
  questionData: any;

  private questions = [
    { id: 1, question: 'Hỏi về dịch vụ', email: 'nguyenvanan@example.com', status: true },
    { id: 2, question: 'Hỏi về giá vé', email: 'nguyenvanbinh@example.com', status: false },
    { id: 3, question: 'Hỏi về lịch trình', email: 'nguyenvancuong@example.com', status: true },
    { id: 4, question: 'Hỏi về chính sách hoàn vé', email: 'nguyenvandung@example.com', status: false },
    { id: 5, question: 'Hỏi về phương thức thanh toán', email: 'nguyenvanem@example.com', status: true }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,

  ) {
    this.replyForm = this.fb.group({
      reply: ['']
    });
  }

  ngOnInit() {
    this.questionId = +this.route.snapshot.paramMap.get('id')!;
    this.questionData = this.questions.find(q => q.id === this.questionId);
  }


}