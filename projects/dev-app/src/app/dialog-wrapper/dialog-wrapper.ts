import { RndDialogDragHandle } from '@acrodata/rnd-dialog';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { AppItem } from '../desktop/desktop';
import { DialogContent } from '../dialog-content/dialog-content';
import { DialogHeader } from '../dialog-header/dialog-header';

@Component({
  selector: 'app-dialog-wrapper',
  imports: [DialogHeader, DialogContent, RndDialogDragHandle],
  templateUrl: './dialog-wrapper.html',
  styleUrl: './dialog-wrapper.scss',
})
export class DialogWrapper {
  data = inject<AppItem>(DIALOG_DATA);
}
