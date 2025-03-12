import { GuiFields, GuiModule } from '@acrodata/gui';
import { RndDialog, RndDialogDragHandle } from '@acrodata/rnd-dialog';
import { DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DialogHeaderComponent } from '../dialog-header/dialog-header.component';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [
    FormsModule,
    RndDialogDragHandle,
    GuiModule,
    MatButtonModule,
    DialogHeaderComponent,
    DialogContentComponent,
  ],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss',
})
export class PlaygroundComponent {
  private rndDialog = inject(RndDialog);

  guiConfig: GuiFields = {
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

  guiModel: DialogConfig<string, DialogRef> = {
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

  openDialog(tpl: TemplateRef<any>) {
    this.rndDialog.open(tpl, this.guiModel);
  }
}
