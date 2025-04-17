import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchDataService {
    // BehaviorSubject  duy trì và phát ra trạng thái (state)
  private tripsDataSource = new BehaviorSubject<any[]>([]);
  tripsData$ = this.tripsDataSource.asObservable();
//   asObservable(), chỉ có thể subscribe vào giá trị
//   mà không thể phát giá trị mới thông qua next(), 
//   vì sử dụng Observable thay vì Subject.
  setTripsData(tripsData: any[]) {
    this.tripsDataSource.next(tripsData);
  }
}
