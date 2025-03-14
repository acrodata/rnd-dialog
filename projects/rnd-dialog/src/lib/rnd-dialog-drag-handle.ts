import { DialogRef } from '@angular/cdk/dialog';
import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';
import { OnEvent } from '@scena/event-emitter';
import Gesto, { OnDrag } from 'gesto';
import { RndDialogContainer } from './rnd-dialog-container';

@Directive({
  selector: '[rnd-dialog-drag-handle], [rndDialogDragHandle]',
  exportAs: 'rndDialogDragHandle',
  standalone: true,
  host: {
    '(pointerdown)': 'onDragStart($event)',
  },
})
export class RndDialogDragHandle implements AfterViewInit {
  private dialogRef = inject(DialogRef);
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  private gesto?: Gesto;

  isDragging = false;

  get containerInstance() {
    return this.dialogRef.containerInstance as RndDialogContainer;
  }

  x = this.containerInstance.x;
  y = this.containerInstance.y;

  ngAfterViewInit(): void {
    this.gesto = new Gesto(this.elementRef.nativeElement, {});
  }

  onDragStart(e: MouseEvent | TouchEvent) {
    this.x = this.containerInstance.x;
    this.y = this.containerInstance.y;

    this.gesto?.on('drag', this.onDrag).on('dragEnd', this.onDragEnd);
  }

  onDrag = (e: OnEvent<OnDrag<Gesto>, Gesto>) => {
    this.isDragging = true;
    this.containerInstance.x = this.x + e.distX;
    this.containerInstance.y = Math.max(0, this.y + e.distY); // 向上拖拽不能超出屏幕，参考 Mac 窗口行为
  };

  onDragEnd = (e: OnEvent<OnDrag<Gesto>, Gesto>) => {
    this.isDragging = false;
    this.gesto?.off('drag', this.onDrag);
  };
}
