import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { Observable } from 'rxjs';

export interface CancelDialogData {
  id: number;
  service: (id: number, note?: string) => Observable<any>;
}

@Component({
  selector: 'app-form-cancel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './form-cancel.component.html',
})
export class FormCancelComponent {
  readonly dialogRef = inject(MatDialogRef<FormCancelComponent>);
  readonly data = inject<CancelDialogData>(MAT_DIALOG_DATA);

  selectedReason = 'Không thể đi';
  otherReason = '';

  constructor(private notificationService: NotificationService) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    const note = this.selectedReason === 'Khác' ? this.otherReason : this.selectedReason;

    this.data.service(this.data.id, note).subscribe({
      next: (res) => {
        if (res.success) {
          this.notificationService.showSuccess(res.message);
          this.dialogRef.close(true);
        } else {
          this.notificationService.showError(res.message);
          this.dialogRef.close(false);
        }
      },
      error: (err) => {
        this.notificationService.showError(err.error?.message);
        this.dialogRef.close(false);
      }
    });
  }
}
