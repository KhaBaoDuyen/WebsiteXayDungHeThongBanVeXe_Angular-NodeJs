
import { Routes } from '@angular/router';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserCreateComponent } from './user-create/user-create.component';



export const userRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'userGetAll',
        component:AdminUsersComponent ,
      },
      {
        path: 'userAdd',
        component:UserCreateComponent
      },
      {
        path: 'userEdit/:id',
        component: UserEditComponent,
      },
    ],
  },
];
