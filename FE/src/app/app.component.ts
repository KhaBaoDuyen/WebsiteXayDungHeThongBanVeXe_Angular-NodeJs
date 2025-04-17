import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NotificationService } from './services/notification.service';
import { Subscription } from 'rxjs';
import { ImageUploaderDirective } from "../app/directives/images-upload.directive";
import { AuthService } from './services/apis/auth.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet,CommonModule,ImageUploaderDirective ],
    templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'BuiDuong';
  successMessage: string = '';
  errorMessage: string = '';
  private successSubscription: Subscription;
  private errorSubscription: Subscription;
  router: any;

  constructor(private notificationService: NotificationService,
    private authService :AuthService,
  ) {
    this.notificationService.successMessage$.subscribe(
      (message) => (this.successMessage = message)
    );
    this.notificationService.errorMessage$.subscribe(
      (message) => (this.errorMessage = message)
    );

      this.successSubscription = this.notificationService.successMessage$.subscribe(message => {
      this.successMessage = message;
    });

    this.errorSubscription = this.notificationService.errorMessage$.subscribe(message => {
      this.errorMessage = message;
    });
   }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/login']); 
    }
   this.checkUrl();
  }

  ngOnDestroy() {
    this.successSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }



  protected checkUrl() {
    const userSession = localStorage.getItem('token');
    if (userSession) {
      const basePathRoute = location.pathname;
      if (basePathRoute.includes('/auth/login')) {
        this.router.navigate(['/categories'], {replaceUrl: true}).then();
      }
    } else {
      this.router.navigate(['/auth/login']).then();
    }
  }
}
