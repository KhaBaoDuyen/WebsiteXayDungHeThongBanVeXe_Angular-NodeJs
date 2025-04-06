import {Component, inject, model} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NotificationService } from 'src/app/services/notification.service';
import { RoutesService } from 'src/app/services/apis/Admin/routes.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

export interface DialogData {
  id:number, 
  name: string;
}
@Component({
  selector: 'form-delete',
  standalone: true,
  templateUrl: 'form-delete.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class FormDeleteComponent {
  readonly dialogRef = inject(MatDialogRef<FormDeleteComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

   constructor(
    private routesService: RoutesService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  delete(id: number): void {
    this.routesService.Delete(id).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.notificationService.showSuccess(res.message || 'Xóa thành công');
          this.dialogRef.close(true); 
        } else {
          this.notificationService.showError(res.message || 'Không thể xóa route');
          this.dialogRef.close(false); 
        }
      },
      error: (err: any) => {
        console.error('API Error:', err);
        this.notificationService.showError(err.error?.message || err.message || 'Lỗi không xác định');
        this.dialogRef.close(false); 
      }
    });
  }
  
  
}
