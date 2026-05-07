import { DialogConfig, DialogContainer } from '@angular/cdk/dialog';
import { BasePortalOutlet } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';

export interface RndDialogBoundaryRect {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export class RndDialogConfig<
  D = unknown,
  R = unknown,
  C extends DialogContainer = BasePortalOutlet,
> extends DialogConfig<D, R, C> {
  boundary?: string | HTMLElement | RndDialogBoundaryRect;
}

@Injectable({ providedIn: 'root' })
export class RndDialogConfigMap {
  private readonly _configs = new Map<string, RndDialogConfig | undefined>();

  set(id: string, config?: RndDialogConfig): void {
    this._configs.set(id, config);
  }

  get(id: string) {
    return this._configs.get(id);
  }

  remove(id: string) {
    this._configs.delete(id);
  }

  clear() {
    this._configs.clear();
  }
}
