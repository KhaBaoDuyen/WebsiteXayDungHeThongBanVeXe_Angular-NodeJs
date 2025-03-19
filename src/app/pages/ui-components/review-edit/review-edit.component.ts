import { Component } from '@angular/core';
import { reviewInterface } from '../../../interface/reviewInterface';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-edit',
  imports: [MatIconModule,CommonModule],
  templateUrl: './review-edit.component.html',
  styleUrl: './review-edit.component.scss'
})
export class ReviewEditComponent {
  review: reviewInterface = {
    id: 1,
    userID: 1,
    tripID: 1,
    rating: 5,
    comment: `Website đặt vé xe trực tuyến này mang đến trải nghiệm thuận tiện cho người dùng với giao diện thân thiện và dễ sử dụng. Ngay từ trang chủ, khách hàng có thể dễ dàng tìm kiếm chuyến xe phù hợp bằng cách nhập điểm đi, điểm đến và thời gian mong muốn. Hệ thống lọc và sắp xếp kết quả cũng được tối ưu, giúp người dùng nhanh chóng lựa chọn chuyến xe theo giá cả, hãng xe hoặc thời gian khởi hành.    
    Quá trình đặt vé diễn ra mượt mà với các bước đơn giản, từ chọn chỗ ngồi, nhập thông tin hành khách cho đến thanh toán trực tuyến. Việc tích hợp nhiều phương thức thanh toán như ví điện tử, thẻ ngân hàng và QR code giúp khách hàng linh hoạt hơn trong giao dịch.   
    Ngoài ra, website cũng cung cấp thông tin chi tiết về từng nhà xe, bao gồm đánh giá từ khách hàng trước đó, giúp người dùng có cái nhìn khách quan hơn trước khi đặt vé. Tuy nhiên, phần hỗ trợ trực tuyến cần được cải thiện để phản hồi nhanh hơn trong giờ cao điểm. Nếu có thêm tính năng nhắc nhở lịch trình hoặc hoàn vé linh hoạt, website sẽ trở nên hoàn thiện hơn.    
    Nhìn chung, đây là một nền tảng đặt vé xe tiện lợi, phù hợp với nhu cầu di chuyển của hành khách hiện đại.`,
    createAt: new Date(),
    updateAt: new Date(),
    image:'user-7.jpg',
    status: 'active'
  };
}
