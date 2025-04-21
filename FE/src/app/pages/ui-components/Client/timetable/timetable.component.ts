import { HomeService } from 'src/app/services/apis/Client/home.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchDataService } from 'src/app/services/apis/Client/search-data.service';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-timetable',
  imports: [CommonModule,
    RouterModule,
  ],
  templateUrl: './timetable.component.html',
  styleUrl:'./timeTable.scss'
})
export class TimetableComponent implements OnInit, OnDestroy {
  tripsData: any[] = [];
  searchParams: any;
  private sub: Subscription = new Subscription();
  allTripsData: any;
  tripId: number;
  showSuccessPopup = false;


  constructor(private router: Router,
    private homeService: HomeService,
    private searchDataService: SearchDataService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,

  ) { }

  ngOnInit() {
    this.sub = this.searchDataService.tripsData$.subscribe(data => {
      if (data && data.length > 0) {
        this.tripsData = data;
        console.log(" Hiển thị dữ liệu từ tìm kiếm:", data);
      } else {
        this.getData();
      }
    });
    const queryParams = this.route.snapshot.queryParams;

    if (queryParams['payment'] === 'success') {
      this.showSuccessPopup = true;
      setTimeout(() => this.showSuccessPopup = false, 3000);
    } else if (queryParams['payment'] === 'failed') {
      this.notificationService.showError('Thanh toán thất bại. Vui lòng thử lại.');
    }


  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  getData() {
    this.homeService.TimeTable().subscribe({
      next: (res: any) => {
        this.allTripsData = res.data || [];
        this.tripsData = [...this.allTripsData];
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy dữ liệu:', err);
        this.allTripsData = [];
        this.tripsData = [];
      }
    });
  }


  resetToAll() {
    this.tripsData = [...this.allTripsData];
  }

}
