import { DialogRef } from '@angular/cdk/dialog';
import { DOCUMENT } from '@angular/common';
import { Directive, inject } from '@angular/core';
import { RndDialogContainer } from './rnd-dialog-container';

@Directive({
  selector: '[rnd-dialog-drag-handle], [rndDialogDragHandle]',
  exportAs: 'rndDialogDragHandle',
  standalone: true,
  host: {
    '(pointerdown)': 'onDragStart($event)',
  },
})
export class RndDialogDragHandle {
  private dialogRef = inject(DialogRef);
  private document = inject(DOCUMENT);

  isDragging = false;

  get containerInstance() {
    return this.dialogRef.containerInstance as RndDialogContainer;
  }

  x = this.containerInstance.x;
  y = this.containerInstance.y;

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

    this.document.addEventListener('pointermove', this.onDrag, { passive: false });
    this.document.addEventListener('pointerup', this.onDragEnd, { passive: false });
  }

  onDrag = (e: PointerEvent) => {
    e.preventDefault();

    this.isDragging = true;

    const distX = e.clientX - this.pointerStartX;
    const distY = e.clientY - this.pointerStartY;

    this.containerInstance.x = this.x + distX;
    // Dragging upward cannot exceed the top of the screen, following Mac window behavior
    this.containerInstance.y = Math.max(0, this.y + distY);
  };

  onDragEnd = (e: PointerEvent) => {
    this.isDragging = false;

    this.document.removeEventListener('pointermove', this.onDrag);
    this.document.removeEventListener('pointerup', this.onDragEnd);
  };
}
