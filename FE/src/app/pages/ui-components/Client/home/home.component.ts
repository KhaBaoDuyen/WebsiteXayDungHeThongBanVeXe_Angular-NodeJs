import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/apis/Client/home.service';
import { SearchDataService } from 'src/app/services/apis/Client/search-data.service';
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  tripsData: any[] = [];
  selectedStartPoint: string | null = null;
  selectedEndPoint: string | null = null;
  startPoint: string;
  endPoint: string;
  constructor(
    private searchDataService: SearchDataService,
    private homeService: HomeService,
    private router: Router,

  ) {

  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  sreachRoutes(startPoint: string, endPoint: string) {
    this.selectedStartPoint = startPoint;
    this.selectedEndPoint = endPoint;
    this.handleSearch();
  }
  
  handleSearch(): void {
    const body = {
      startPoint: this.selectedStartPoint?.trim(),
      endPoint: this.selectedEndPoint?.trim(),
      travelTime: new Date(),
    };
  
    this.homeService.Search(body).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.searchDataService.setTripsData(res.data); // <- phát sóng dữ liệu mới
          if (this.router.url !== '/timetable') {
            this.router.navigate(['/timetable']);
          }
        } else {
          console.error('Lỗi từ server:', res?.message);
        }
        console.log("Kết quả tìm kiếm trả về:", res);
      },
      error: (err: any) => {
        console.error('Lỗi khi tìm kiếm:', err);
      }
    });
  }
  



  ngOnInit() {

  }
}
