import { RndDialog } from '@acrodata/rnd-dialog';
import { DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Component, inject } from '@angular/core';
import { DialogWrapperComponent } from '../dialog-wrapper/dialog-wrapper.component';
import { SettingsComponent } from '../settings/settings.component';

export interface AppItem {
  component: ComponentType<any>;
  name: string;
  color: string;
  config: DialogConfig<any, DialogRef>;
  active?: boolean;
}

@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.scss',
})
export class DesktopComponent {
  private rndDialog = inject(RndDialog);

  dialogConfig: DialogConfig<any, DialogRef> = {
    data: 'Hello, World!',
    width: '400px',
    height: '400px',
    minWidth: '20%',
    minHeight: '20%',
    maxWidth: '80vw',
    maxHeight: '80vh',
    hasBackdrop: false,
    disableClose: false,
  };

  apps: AppItem[] = [
    {
      component: DialogWrapperComponent,
      name: 'Demo 1',
      color: '#ff605c',
      config: this.dialogConfig,
    },
    {
      component: DialogWrapperComponent,
      name: 'Demo 2',
      color: '#ffbd44',
      config: this.dialogConfig,
    },
    {
      component: DialogWrapperComponent,
      name: 'Demo 3',
      color: '#00ca4e',
      config: this.dialogConfig,
    },
    {
      component: DialogWrapperComponent,
      name: 'Demo 4',
      color: '#0043ff',
      config: this.dialogConfig,
    },
    {
      component: DialogWrapperComponent,
      name: 'Demo 5',
      color: '#8a03c4',
      config: this.dialogConfig,
    },
    {
      component: SettingsComponent,
      name: 'Settings',
      color: '#e1dfe1',
      config: this.dialogConfig,
    },
  ];

  openDialog(app: AppItem) {
    if (app.active) return;

    const dialog = this.rndDialog.open(app.component, {
      ...this.dialogConfig,
      data: app,
    });
    dialog.closed.subscribe(v => {
      app.active = false;
    });

    app.active = true;
  }
}
