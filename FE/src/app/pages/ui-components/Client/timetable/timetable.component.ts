import { HomeService } from 'src/app/services/apis/Client/home.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchDataService } from 'src/app/services/apis/Client/search-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timetable',
  imports: [CommonModule],
  templateUrl: './timetable.component.html',
})
export class TimetableComponent implements OnInit, OnDestroy {
  tripsData: any[] = [];
  searchParams: any;
  private sub: Subscription = new Subscription();
  allTripsData: any;

  constructor(private router: Router,
    private homeService: HomeService,
    private searchDataService: SearchDataService
  ) { }

  ngOnInit() {
    this.sub = this.searchDataService.tripsData$.subscribe(data => {
      this.tripsData = data;
    });
    this.getData();
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
