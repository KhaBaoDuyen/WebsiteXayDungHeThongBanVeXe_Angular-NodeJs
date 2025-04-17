import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../common/api.service';
import { Observable } from 'rxjs';
import { API_ENDPOINT_AD } from 'src/app/config/api-endpoint-Admin.config';
import { blogInterface } from 'src/app/interface/blogInterface';

@Injectable({
    providedIn: 'root'
})
export class BlogsService extends ApiService {

    constructor(
        private _http: HttpClient
    ) {
        super(_http);
    }

    // Lấy danh sách tất cả bài viết
    List(): Observable<blogInterface[]> {
        return this.get<blogInterface[]>(API_ENDPOINT_AD.blogs.base + API_ENDPOINT_AD.blogs.list);
    }

    // Lấy bài viết theo ID
    getById(id: number): Observable<blogInterface> {
        return this.get<blogInterface>(API_ENDPOINT_AD.blogs.base + API_ENDPOINT_AD.blogs.getById + '/' + id);
    }

    // Cập nhật bài viết
    Update(id: number, data: any): Observable<blogInterface> {
        return this.patch<blogInterface>(API_ENDPOINT_AD.blogs.base + API_ENDPOINT_AD.blogs.update + '/' + id, data);
    }

    // Xóa bài viết
    Delete(id: number): Observable<blogInterface> {
        return this.delete(API_ENDPOINT_AD.blogs.base + '/' + id);
    }
      

    Create(data: any): Observable<blogInterface> {
        return this.post<blogInterface>(API_ENDPOINT_AD.blogs.base + API_ENDPOINT_AD.blogs.add, data);
    }
    
    
}
