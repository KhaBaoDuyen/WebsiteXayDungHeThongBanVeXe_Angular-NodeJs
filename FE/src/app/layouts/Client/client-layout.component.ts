import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CoreService } from '../../services/core.service'; // Replace 'path-to-core-service' with the actual path
@Component({
  selector: 'app-client-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent,],
  template: `
    <app-header></app-header>
   <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
})
export class ClientLayoutComponent {
  
  constructor(private coreService: CoreService) {}

  openModal() {
      this.coreService.openCancelModal();
  }

}
