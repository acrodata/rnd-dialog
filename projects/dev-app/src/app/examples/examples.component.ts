import { RndDialog, RndDialogDragHandle } from '@acrodata/rnd-dialog';
import { Component, inject, TemplateRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-examples',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    RndDialogDragHandle,
  ],
  templateUrl: './examples.component.html',
  styleUrl: './examples.component.scss',
})
export class ExamplesComponent {
  private dialog = inject(MatDialog);
  private rndDialog = inject(RndDialog);

  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  openDialog(tpl: TemplateRef<any>) {
    const dialogRef = this.dialog.open(tpl, {
      data: {},
    });
  }

  openRndDialog(tpl: TemplateRef<any>) {
    this.rndDialog.open(tpl, {
      hasBackdrop: false,
    });
  }
}
