import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable, TemplateRef } from '@angular/core';
import { RndDialogContainer } from './rnd-dialog-container';

@Injectable({ providedIn: 'root' })
export class RndDialog {
  private dialog = inject(Dialog);
  private overlay = inject(Overlay);

  get openDialogs() {
    return this.dialog.openDialogs;
  }

  get afterOpened() {
    return this.dialog.afterOpened;
  }

  readonly afterAllClosed = this.dialog.afterAllClosed;

  open<R = unknown, D = unknown, C = unknown>(
    componentOrTemplateRef: ComponentType<C> | TemplateRef<C>,
    config?: DialogConfig<D, DialogRef<R, C>>
  ) {
    return this.dialog.open<R, D, C>(componentOrTemplateRef, {
      container: RndDialogContainer,
      positionStrategy: this.overlay.position().global().start().top(),
      panelClass: 'rnd-dialog-panel',
      backdropClass: 'cdk-overlay-transparent-backdrop',
      ...config,
    });
  }

  closeAll() {
    this.dialog.closeAll();
  }

  getDialogById<R, C>(id: string) {
    return this.dialog.getDialogById<R, C>(id);
  }
}
