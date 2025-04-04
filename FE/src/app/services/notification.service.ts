import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private successSubject = new BehaviorSubject<string>('');
  private errorSubject = new BehaviorSubject<string>('');

  successMessage$ = this.successSubject.asObservable();
  errorMessage$ = this.errorSubject.asObservable();

  showSuccess(message: string) {
    this.successSubject.next(message);
    this.setAutoClear();
  }

  showError(message: string) {
    this.errorSubject.next(message);
    this.setAutoClear();
  }

  clearMessages() {
    this.successSubject.next('');
    this.errorSubject.next('');
  }

  private setAutoClear() {
    timer(3000).pipe(take(1)).subscribe(() => {
      this.clearMessages();
    });
  }
}