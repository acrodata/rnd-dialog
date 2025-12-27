import { CdkDialogContainer, Dialog, DialogRef } from '@angular/cdk/dialog';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { getElementSize } from './utils';
import { RndDialogDragConstraints } from './rnd-dialog';

type resizableHandleDir = 'n' | 'e' | 's' | 'w' | 'ne' | 'se' | 'sw' | 'nw';

@Component({
  selector: 'rnd-dialog-container',
  imports: [CdkPortalOutlet],
  templateUrl: './rnd-dialog-container.html',
  styleUrl: './rnd-dialog-container.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'rnd-dialog-container',
    'tabindex': '-1',
    '[attr.id]': '_config.id || null',
    '[attr.role]': '_config.role',
    '[attr.aria-modal]': '_config.ariaModal',
    '[attr.aria-labelledby]': '_config.ariaLabel ? null : _ariaLabelledByQueue[0]',
    '[attr.aria-label]': '_config.ariaLabel',
    '[attr.aria-describedby]': '_config.ariaDescribedBy || null',
    '[style.left.px]': 'x',
    '[style.top.px]': 'y',
    '[style.width.px]': 'w',
    '[style.height.px]': 'h',
    '[class.active]': 'isActive',
    '(pointerdown)': 'setActive()',
  },
})
export class RndDialogContainer extends CdkDialogContainer implements OnInit, AfterViewInit {
  private dialog = inject(Dialog);
  private dialogRef = inject(DialogRef);
  private document = inject(DOCUMENT);
  private cdr = inject(ChangeDetectorRef);

  get containerElement() {
    return this._elementRef.nativeElement as HTMLElement;
  }

  get overlayElement() {
    return this.dialogRef.overlayRef.overlayElement;
  }
  dragConstraints: RndDialogDragConstraints = {
    top: false,
    right: false,
    bottom: false,
    left: false,
  };

  isActive = true;

  handleDirs: resizableHandleDir[] = ['e', 'se', 's', 'sw', 'w', 'nw', 'n', 'ne'];

  dir: resizableHandleDir | null = null;

  minW = 200;
  minH = 200;
  maxW = Infinity;
  maxH = Infinity;

  w = 400;
  h = 400;
  x = 0;
  y = 0;

  // Save the initial size and position before dragging
  startW = 0;
  startH = 0;
  startX = 0;
  startY = 0;

  // Restriction coordinates for the n and w
  restrictX = 0;
  restrictY = 0;

  // The coordinates when the mouse is pressed down
  pointerStartX = 0;
  pointerStartY = 0;

  defaultZIndex = 1000;

  ngOnInit(): void {
    const { minWidth, minHeight, maxWidth, maxHeight } = this.overlayElement.style;

    const config = this._config as any;
    if (config?.data?.dragConstraints) {
      this.dragConstraints = { ...this.dragConstraints, ...config.data.dragConstraints };
    }

    const minSize = getElementSize(minWidth, minHeight);
    this.minW = minSize.w || 200;
    this.minH = minSize.h || 200;

    const maxSize = getElementSize(maxWidth, maxHeight);
    this.maxW = maxSize.w || Infinity;
    this.maxH = maxSize.h || Infinity;

    // Get size information in units other than px
    this.w = this.overlayElement.offsetWidth || 400;
    this.h = this.overlayElement.offsetHeight || 400;

    // Center the dialog
    this.x = (window.innerWidth - this.w) / 2;
    this.y = (window.innerHeight - this.h) / 2;

    this.setActive();
  }

  ngAfterViewInit(): void {
    // Remove cdk-overlay-pane's styles
    this.overlayElement.removeAttribute('style');
  }

  onResizeStart(e: PointerEvent, dir: resizableHandleDir) {
    e.preventDefault();

    this.dir = dir;

    this.startW = this.w;
    this.startH = this.h;
    this.startX = this.x;
    this.startY = this.y;

    this.restrictX = this.x + this.w - this.minW;
    this.restrictY = this.y + this.h - this.minH;

    this.pointerStartX = e.clientX;
    this.pointerStartY = e.clientY;

    this.document.addEventListener('pointermove', this.onResize, { passive: false });
    this.document.addEventListener('pointerup', this.onResizeEnd, { passive: false });
  }

  onResize = (e: PointerEvent) => {
    e.preventDefault();

    const distX = e.clientX - this.pointerStartX;
    const distY = e.clientY - this.pointerStartY;

    // e width
    const eW = Math.min(
      Math.max(this.startW + distX, this.minW),
      this.maxW,
      window.innerWidth - this.startX
    );
    // s height
    const sH = Math.min(
      Math.max(this.startH + distY, this.minH),
      this.maxH,
      window.innerHeight - this.startY
    );
    // w width
    const wW = Math.min(
      Math.max(this.startW - distX, this.minW),
      this.maxW,
      this.startW + this.startX
    );
    // n height
    const nH = Math.min(
      Math.max(this.startH - distY, this.minH),
      this.maxH,
      this.startH + this.startY
    );
    // The x coord cannot exceed the screen boundary, following Mac window behavior
    const wX = Math.max(
      this.startW - distX > this.minW ? this.startX + distX : this.restrictX,
      this.startX + this.startW - this.maxW,
      0
    );
    // The y coord cannot exceed the screen boundary, following Mac window behavior
    const nY = Math.max(
      this.startH - distY > this.minH ? this.startY + distY : this.restrictY,
      this.startY + this.startH - this.maxH,
      0
    );

    switch (this.dir) {
      case 'e': // →
        this.w = eW;
        break;
      case 'se': // ↘
        this.w = eW;
        this.h = sH;
        break;
      case 's': // ↓
        this.h = sH;
        break;
      case 'sw': // ↙
        this.w = wW;
        this.h = sH;
        this.x = wX;
        break;
      case 'w': // ←
        this.w = wW;
        this.x = wX;
        break;
      case 'nw': // ↖
        this.w = wW;
        this.x = wX;
        this.h = nH;
        this.y = nY;
        break;
      case 'n': // ↑
        this.h = nH;
        this.y = nY;
        break;
      case 'ne': // ↗
        this.w = eW;
        this.h = nH;
        this.y = nY;
        break;
    }
    this.markForCheck();
  };

  onResizeEnd = (e: PointerEvent) => {
    this.document.removeEventListener('pointermove', this.onResize);
    this.document.removeEventListener('pointerup', this.onResizeEnd);
  };

  setActive() {
    // First, get a list of instances sorted by the element's z-index
    const openDialogRefs = this.getSortedDialogs();
    // Move the active dialog to the end of the array
    const index = openDialogRefs.indexOf(this.dialogRef);
    openDialogRefs.splice(index, 1);
    openDialogRefs.push(this.dialogRef);
    // Set new z-index values according to the order in the array
    openDialogRefs.forEach((ref, index) => {
      ref.overlayRef.hostElement.style.zIndex = this.defaultZIndex + 1 + index + '';
      // If a backdrop is shown, its z-index should also be set
      if (ref.overlayRef.backdropElement) {
        ref.overlayRef.backdropElement.style.zIndex = this.defaultZIndex + 1 + index + '';
      }
    });

    setTimeout(() => {
      openDialogRefs.forEach(ref => {
        (ref.containerInstance as RndDialogContainer).isActive = false;
      });
      this.isActive = true;
      this.markForCheck();
    });
  }

  getSortedDialogs() {
    return [...this.dialog.openDialogs]
      .filter(ref => (ref.containerInstance as RndDialogContainer).handleDirs)
      .sort(
        (a, b) => +a.overlayRef.hostElement.style.zIndex - +b.overlayRef.hostElement.style.zIndex
      );
  }

  markForCheck() {
    this.cdr.markForCheck();
  }
}
