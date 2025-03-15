import { RndDialog } from '@acrodata/rnd-dialog';
import { DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
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
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'os-desktop',
  },
})
export class DesktopComponent implements OnInit {
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

  currentDatetime = '';

  ngOnInit(): void {
    this.openDialog(this.apps[this.apps.length - 1]);

    this.getCurrentDatetime();
  }

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

  getCurrentDatetime() {
    setInterval(() => {
      this.currentDatetime = format(Date.now(), 'MMM do EEE HH:mm', {
        locale: zhCN,
      });
    }, 1000);
  }
}
