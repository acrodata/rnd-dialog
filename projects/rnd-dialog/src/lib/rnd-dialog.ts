import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable, InjectionToken, TemplateRef } from '@angular/core';
import { RndDialogConfig, RndDialogConfigMap } from './rnd-dialog-config';
import { RndDialogContainer } from './rnd-dialog-container';

export const DEFAULT_RND_DIALOG_CONFIG = new InjectionToken<RndDialogConfig>(
  'DefaultRndDialogConfig'
);

@Injectable({ providedIn: 'root' })
export class RndDialog {
  private _dialog = inject(Dialog);
  private _overlay = inject(Overlay);
  private _configMap = inject(RndDialogConfigMap);
  private _defaultOptions = inject<RndDialogConfig>(DEFAULT_RND_DIALOG_CONFIG, { optional: true });

  get openDialogs() {
    return this._dialog.openDialogs;
  }

  get afterOpened() {
    return this._dialog.afterOpened;
  }

  readonly afterAllClosed = this._dialog.afterAllClosed;

  open<R = unknown, D = unknown, C = unknown>(
    componentOrTemplateRef: ComponentType<C> | TemplateRef<C>,
    config?: RndDialogConfig<D, DialogRef<R, C>>
  ) {
    const defaults = this._defaultOptions as RndDialogConfig<D, DialogRef<R, C>>;
    config = { ...defaults, ...config };

    const dialogRef = this._dialog.open<R, D, C>(componentOrTemplateRef, {
      container: RndDialogContainer,
      positionStrategy: this._overlay.position().global().start().top(),
      panelClass: 'rnd-_dialog-panel',
      backdropClass: 'cdk-overlay-transparent-backdrop',
      ...config,
    });

    this._configMap.set(dialogRef.id, config as RndDialogConfig);

    dialogRef.closed.subscribe(() => this._configMap.remove(dialogRef.id));

    return dialogRef;
  }

  closeAll() {
    this._dialog.closeAll();
    this._configMap.clear();
  }

  getDialogById<R, C>(id: string) {
    return this._dialog.getDialogById<R, C>(id);
  }
}
