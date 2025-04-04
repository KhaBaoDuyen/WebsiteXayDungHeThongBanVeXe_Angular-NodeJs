import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NotificationService } from './services/notification.service';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-root',
    imports: [RouterOutlet,CommonModule ],
    templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'BuiDuong';
  successMessage: string = '';
  errorMessage: string = '';
  private successSubscription: Subscription;
  private errorSubscription: Subscription;

  constructor(private notificationService: NotificationService) {
    this.notificationService.successMessage$.subscribe(
      (message) => (this.successMessage = message)
    );
    this.notificationService.errorMessage$.subscribe(
      (message) => (this.errorMessage = message)
    );
   }

  ngOnInit() {
    this.successSubscription = this.notificationService.successMessage$.subscribe(message => {
      this.successMessage = message;
    });

    this.errorSubscription = this.notificationService.errorMessage$.subscribe(message => {
      this.errorMessage = message;
    });
  }

  ngOnDestroy() {
    this.successSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }
}
