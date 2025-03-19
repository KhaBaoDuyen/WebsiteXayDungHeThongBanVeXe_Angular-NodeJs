import { Component } from '@angular/core';
import { userInterface } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-user-edit',
  imports: [],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent {
 users: userInterface = {
   id: 1,
   fullName: 'Nguyễn Văn A',
   phone: '0987654321',
   status: 'active',
   image: 'user-7.jpg',
   email: 'NguyenVanA@gmail.com',
   role: 'User'
 }
}