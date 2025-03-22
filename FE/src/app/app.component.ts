import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/Client/header/header.component';
import { FooterComponent } from './layouts/Client/footer/footer.component';
@Component({
    selector: 'app-root',
    imports: [RouterOutlet  ],
    templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'BuiDuong';
}
