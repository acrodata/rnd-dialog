import { RndDialogDragHandle } from '@acrodata/rnd-dialog';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { AppItem } from '../desktop/desktop.component';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { DialogHeaderComponent } from '../dialog-header/dialog-header.component';

@Component({
  selector: 'app-dialog-wrapper',
  standalone: true,
  imports: [DialogHeaderComponent, DialogContentComponent, RndDialogDragHandle],
  templateUrl: './dialog-wrapper.component.html',
  styleUrl: './dialog-wrapper.component.scss',
})
export class DialogWrapperComponent {
  data = inject<AppItem>(DIALOG_DATA);
}
