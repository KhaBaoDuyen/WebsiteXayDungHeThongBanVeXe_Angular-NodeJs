import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClouService {
  private cloudName = 'dzfiqvhcg';  // Thay thế cloud name của bạn
  private uploadPreset = 'upload_preset';  // Đảm bảo bạn có preset này trong Cloudinary

  constructor(private http: HttpClient) {}

  // Function upload ảnh lên Cloudinary
  uploadImage(file: File): Observable<any> {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;

    const formData = new FormData();
    formData.append('file', file);  // Thêm file vào formData
    formData.append('upload_preset', this.uploadPreset);  // Thêm upload preset

    // Gửi request POST lên Cloudinary và trả về Observable
    return this.http.post<any>(url, formData);
  }
}
