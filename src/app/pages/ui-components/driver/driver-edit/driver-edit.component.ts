import { Component } from '@angular/core';
import { driveriInterface } from '../../../../interface/driver.interface'; 

@Component({
  selector: 'app-driver-edit',
  templateUrl: './driver-edit.component.html',
  styleUrl: './driver-edit.component.scss'
})
export class DriverEditComponent {
  driver: driveriInterface = {
    id: 1,
    fullName: 'Nguyễn Văn A',
    phone: '0987654321',
    licenseNumber: '123456789',
    experienceYears: 5,
    birthDate: '1990-01-01',
    status: 'active',
    createdAt: '2023-01-01',
    age: 33,
    image: 'user-7.jpg', 
  };
}