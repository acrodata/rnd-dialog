import { DialogRef } from '@angular/cdk/dialog';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Directive, inject } from '@angular/core';
import { RndDialogConfigMap } from './rnd-dialog-config';
import { RndDialogContainer } from './rnd-dialog-container';
import { getBoundaryRect } from './utils';

@Directive({
  selector: '[rnd-dialog-drag-handle], [rndDialogDragHandle]',
  exportAs: 'rndDialogDragHandle',
  host: {
    '(pointerdown)': 'onDragStart($event)',
  },
})
export class RndDialogDragHandle {
  private _cdr = inject(ChangeDetectorRef);
  private _dialogRef = inject(DialogRef);
  private _document = inject(DOCUMENT);
  private _configMap = inject(RndDialogConfigMap);

  get config() {
    return this._configMap.get(this._dialogRef.id);
  }

  get boundaryRect() {
    const boundaryRect = getBoundaryRect(this.config?.boundary);
    return {
      // Dragging upward cannot exceed the top of the screen, following Mac window behavior
      top: boundaryRect?.top ?? 0,
      bottom: boundaryRect?.bottom ?? Infinity,
      left: boundaryRect?.left ?? -Infinity,
      right: boundaryRect?.right ?? Infinity,
    };
  }

  isDragging = false;

  get containerInstance() {
    return this._dialogRef.containerInstance as RndDialogContainer;
  }

  x = this.containerInstance.x;
  y = this.containerInstance.y;
  w = this.containerInstance.w;
  h = this.containerInstance.h;

  pointerStartX = 0;
  pointerStartY = 0;

  onDragStart(e: PointerEvent) {
    e.preventDefault();

    // Stop dragging when click the button
    const target = e.target as HTMLElement;
    if (target.closest('button')) {
      return;
    }

    this.x = this.containerInstance.x;
    this.y = this.containerInstance.y;

    this.pointerStartX = e.clientX;
    this.pointerStartY = e.clientY;

    this._cdr.markForCheck();

    this._document.addEventListener('pointermove', this.onDrag, { passive: false });
    this._document.addEventListener('pointerup', this.onDragEnd, { passive: false });
  }

  onDrag = (e: PointerEvent) => {
    e.preventDefault();

    this.isDragging = true;

    const distX = e.clientX - this.pointerStartX;
    const distY = e.clientY - this.pointerStartY;

    let newX = this.x + distX;
    let newY = this.y + distY;

    newX = Math.max(this.boundaryRect.left, Math.min(newX, this.boundaryRect.right - this.w));
    newY = Math.max(this.boundaryRect.top, Math.min(newY, this.boundaryRect.bottom - this.h));

    this.containerInstance.x = newX;
    this.containerInstance.y = newY;

    this._cdr.markForCheck();
  };

  onDragEnd = (e: PointerEvent) => {
    this.isDragging = false;
    this._cdr.markForCheck();

    this._document.removeEventListener('pointermove', this.onDrag);
    this._document.removeEventListener('pointerup', this.onDragEnd);
  };
}
