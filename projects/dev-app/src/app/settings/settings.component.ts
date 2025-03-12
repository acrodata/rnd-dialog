import { GuiFields, GuiModule } from '@acrodata/gui';
import { RndDialogDragHandle } from '@acrodata/rnd-dialog';
import { DIALOG_DATA, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppItem } from '../desktop/desktop.component';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { DialogHeaderComponent } from '../dialog-header/dialog-header.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    FormsModule,
    GuiModule,
    RndDialogDragHandle,
    DialogHeaderComponent,
    DialogContentComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
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
  };

  model: DialogConfig<string, DialogRef> = {
    data: 'Hello, World!',
    width: '400px',
    height: '400px',
    minWidth: '20%',
    minHeight: '20%',
    maxWidth: '80vw',
    maxHeight: '80vh',
    hasBackdrop: true,
    disableClose: false,
  };
}
