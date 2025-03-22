import { RoutesGetAllComponent } from "./routes-get-all/routes-get-all.component";
import{RoutesCreateComponent} from "./routes-create/routes-create.component";
import { RoutesEditComponent } from "./routes-edit/routes-edit.component";
import { Routes } from '@angular/router';



export const routesRoutes: Routes = [
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
      {
        path: 'routesEdit/:id',
        component: RoutesEditComponent,
      },
    ],
  },
];
