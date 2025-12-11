import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-dialog-header',
  imports: [],
  templateUrl: './dialog-header.component.html',
  styleUrl: './dialog-header.component.scss',
})
export class DialogHeaderComponent {
  private dialogRef = inject(DialogRef);

  close() {
    this.dialogRef.close();
  }
}
