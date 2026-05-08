import { RndDialog, RndDialogConfig } from '@acrodata/rnd-dialog';
import { DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { ChangeDetectorRef, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { DialogWrapper } from '../dialog-wrapper/dialog-wrapper';
import { Settings } from '../settings/settings';

export interface AppItem {
  component: ComponentType<any>;
  name: string;
  color: string;
  config: DialogConfig<any, DialogRef>;
  active?: boolean;
}

@Component({
  selector: 'app-desktop',
  imports: [],
  templateUrl: './desktop.html',
  styleUrl: './desktop.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'os-desktop',
  },
})
export class Desktop implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private rndDialog = inject(RndDialog);

  dialogConfig: RndDialogConfig<any, DialogRef> = {
    data: 'Hello, World!',
    width: '400px',
    height: '450px',
    minWidth: '20%',
    minHeight: '20%',
    maxWidth: '80vw',
    maxHeight: '80vh',
    hasBackdrop: false,
    disableClose: false,
    boundary: {
      top: 24,
    },
  };

  apps: AppItem[] = [
    {
      component: DialogWrapper,
      name: 'Demo 1',
      color: '#ff605c',
      config: this.dialogConfig,
    },
    {
      component: DialogWrapper,
      name: 'Demo 2',
      color: '#ffbd44',
      config: this.dialogConfig,
    },
    {
      component: DialogWrapper,
      name: 'Demo 3',
      color: '#00ca4e',
      config: this.dialogConfig,
    },
    {
      component: DialogWrapper,
      name: 'Demo 4',
      color: '#0043ff',
      config: this.dialogConfig,
    },
    {
      component: DialogWrapper,
      name: 'Demo 5',
      color: '#8a03c4',
      config: this.dialogConfig,
    },
    {
      component: Settings,
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
      this.cdr.detectChanges();
    });

    app.active = true;
    this.cdr.detectChanges();
  }

  getCurrentDatetime() {
    setInterval(() => {
      this.currentDatetime = format(Date.now(), 'MMM do EEE HH:mm', {
        locale: zhCN,
      });
      this.cdr.detectChanges();
    }, 1000);
  }
}
