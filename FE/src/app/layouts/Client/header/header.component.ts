import { HomeService } from 'src/app/services/apis/Client/home.service';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent, NgSelectConfig, NgSelectModule } from '@ng-select/ng-select';
import { routesInterface } from 'src/app/interface/routes.interface';
import { FormsModule } from '@angular/forms';
import { SearchDataService } from 'src/app/services/apis/Client/search-data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,
    MatMenuModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgSelectComponent,
    NgSelectModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  startPointOptions: routesInterface[] = [];
  endPointOptions: routesInterface[] = [];
  selectedStartPoint: string | null = null;
  selectedEndPoint: string | null = null;
  selectedDate: string = '';
  isSearching: boolean = false;
  [x: string]: any;
  @Input() tripsData: any[];


  get currentUser() {
    return this['authService'].getCurrentUser();
  }

  constructor(
    private router: Router,
    private homeService: HomeService,
    private config: NgSelectConfig,
    private searchDataService: SearchDataService
  ) {
    this.config.notFoundText = 'Custom not found';
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';
  }
  isLoggedIn: boolean = false;
  fullName: string = '';

  ngOnInit() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.isLoggedIn = true;
      const user = JSON.parse(localStorage.getItem('user_info') || '{}');
      this.fullName = user.fullName;
    }

    this.getDataOptions();
  }


  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    this.isLoggedIn = false;
    this.router.navigate(['/auth/login']);
  }

  //-----------------[ SEARCH OPTION ]---------------------------

  getDataOptions(): void {
    this.homeService.List().subscribe({
      next: (res: any) => {
        const data = res?.data ?? [];

        this.startPointOptions = data.map((item: any) => ({
          value: item.startPoint,
          label: item.startPoint
        }));

        this.endPointOptions = data.map((item: any) => ({
          value: item.endPoint,
          label: item.endPoint
        }));
        console.log(res);

      },
      error: (err: any) => {
        console.error('Lỗi khi lấy dữ liệu:', err);
        this.startPointOptions = [];
        this.endPointOptions = [];
      }
    });

  }

  handleSearch(): void {
    const body = {
      startPoint: this.selectedStartPoint,
      endPoint: this.selectedEndPoint,
      travelTime: this.selectedDate
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
  
  
}
