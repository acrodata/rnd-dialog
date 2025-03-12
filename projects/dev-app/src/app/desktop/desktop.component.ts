import { RndDialog } from '@acrodata/rnd-dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Component, inject, OnInit } from '@angular/core';
import { DialogWrapperComponent } from '../dialog-wrapper/dialog-wrapper.component';
import { SettingsComponent } from '../settings/settings.component';

export interface AppItem {
  component: ComponentType<any>;
  name: string;
  color: string;
  data: Record<string, any>;
}

@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.scss',
})
export class DesktopComponent implements OnInit {
  private rndDialog = inject(RndDialog);

  apps: AppItem[] = [
    {
      component: DialogWrapperComponent,
      name: '1',
      color: '#ff605c',
      data: {},
    },
    {
      component: DialogWrapperComponent,
      name: '2',
      color: '#ffbd44',
      data: {},
    },
    {
      component: DialogWrapperComponent,
      name: '3',
      color: '#00ca4e',
      data: {},
    },
    {
      component: DialogWrapperComponent,
      name: '4',
      color: '#0043ff',
      data: {},
    },
    {
      component: DialogWrapperComponent,
      name: '5',
      color: '#8a03c4',
      data: {},
    },
    {
      component: SettingsComponent,
      name: 'settings',
      color: '#e1dfe1',
      data: {},
    },
  ];

  ngOnInit(): void {}

  openDialog(app: AppItem) {
    this.rndDialog.open(app.component, {
      hasBackdrop: false,
      data: app,
    });
  }
}
