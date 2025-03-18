import { Component } from '@angular/core';
import { routesInterface } from '../../../../interface/routes.interface';

@Component({
  selector: 'app-routes-edit',
  imports: [],
  templateUrl: './routes-edit.component.html',
  styleUrl: './routes-edit.component.scss'
})
export class RoutesEditComponent {
  routes: routesInterface = {
    id: 1,
    startPoint: "Hà Nội",
    endPoint: "Hồ Chí Minh",
    distance: "2000 km"
  };
}
