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

    const container = this.containerInstance;
    const constraints = container.dragConstraints;

    // Calculate new position
    let newX = this.x + distX;
    let newY = this.y + distY;

    // Apply drag constraints
    if (constraints.left) {
      newX = Math.max(0, newX);
    }
    if (constraints.right) {
      newX = Math.min(window.innerWidth - container.w, newX);
    }
    if (constraints.top) {
      newY = Math.max(0, newY);
    }
    if (constraints.bottom) {
      newY = Math.min(window.innerHeight - container.h, newY);
    }

    // Update the container position
    container.x = newX;
    container.y = newY;

    // Update DOM position
    container.containerElement.style.left = `${newX}px`;
    container.containerElement.style.top = `${newY}px`;
  };

  onDragEnd = (e: PointerEvent) => {
    this.isDragging = false;

    this.document.removeEventListener('pointermove', this.onDrag);
    this.document.removeEventListener('pointerup', this.onDragEnd);
  };
}
