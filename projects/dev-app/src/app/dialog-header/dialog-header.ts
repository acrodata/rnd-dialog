import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-dialog-header',
  imports: [],
  templateUrl: './dialog-header.html',
  styleUrl: './dialog-header.scss',
})
export class DialogHeader {
  private dialogRef = inject(DialogRef);

  close() {
    this.dialogRef.close();
  }
}
