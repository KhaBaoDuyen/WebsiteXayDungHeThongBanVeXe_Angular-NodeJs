import { RoutesGetAllComponent } from "./routes-get-all/routes-get-all.component";
import{RoutesCreateComponent} from "./routes-create/routes-create.component";
import { Routes } from '@angular/router';



export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'routesGetAll',
        component: RoutesGetAllComponent,
      },
      {
        path: 'routesAdd',
        component: RoutesCreateComponent,
      },
    ],
  },
];
