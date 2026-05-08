import { GuiFields, GuiModule } from '@acrodata/gui';
import { RndDialogDragHandle } from '@acrodata/rnd-dialog';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppItem } from '../desktop/desktop';
import { DialogContent } from '../dialog-content/dialog-content';
import { DialogHeader } from '../dialog-header/dialog-header';

@Component({
  selector: 'app-settings',
  imports: [FormsModule, GuiModule, RndDialogDragHandle, DialogHeader, DialogContent],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  dialogRef = inject(DialogRef);
  data = inject<AppItem>(DIALOG_DATA);

  config: GuiFields = {
    data: {
      name: 'data',
      type: 'textarea',
    },
    width: {
      name: 'width',
      type: 'text',
    },
    height: {
      name: 'height',
      type: 'text',
    },
    minWidth: {
      name: 'minWidth',
      type: 'text',
    },
    minHeight: {
      name: 'minHeight',
      type: 'text',
    },
    maxWidth: {
      name: 'maxWidth',
      type: 'text',
    },
    maxHeight: {
      name: 'maxHeight',
      type: 'text',
    },
    hasBackdrop: {
      name: 'hasBackdrop',
      type: 'switch',
    },
    disableClose: {
      name: 'disableClose',
      type: 'switch',
    },
    boundary: {
      name: 'boundary',
      type: 'inline',
      description: 'string | HTMLElement | RndDialogBoundaryRect',
      children: {
        top: {
          name: 'top',
          type: 'number',
          default: 24,
          col: 25,
        },
        right: {
          name: 'right',
          type: 'number',
          col: 25,
        },
        bottom: {
          name: 'bottom',
          type: 'number',
          col: 25,
        },
        left: {
          name: 'left',
          type: 'number',
          col: 25,
        },
      },
    },
  };

  model = this.data.config;
}
