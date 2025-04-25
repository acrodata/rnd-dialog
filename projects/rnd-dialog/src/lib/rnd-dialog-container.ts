import { CdkDialogContainer, Dialog, DialogRef } from '@angular/cdk/dialog';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { OnEvent } from '@scena/event-emitter';
import Gesto, { OnDrag } from 'gesto';
import { getElementSize } from './utils';

type resizableHandleDir = 'n' | 'e' | 's' | 'w' | 'ne' | 'se' | 'sw' | 'nw';

@Component({
  selector: 'rnd-dialog-container',
  standalone: true,
  imports: [CdkPortalOutlet],
  templateUrl: './rnd-dialog-container.html',
  styleUrl: './rnd-dialog-container.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
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
  private gesto?: Gesto;

  get containerElement() {
    return this._elementRef.nativeElement as HTMLElement;
  }

  get overlayElement() {
    return this.dialogRef.overlayRef.overlayElement;
  }

  isActive = true;

  handleDirs: resizableHandleDir[] = ['e', 'se', 's', 'sw', 'w', 'nw', 'n', 'ne'];

  dir: resizableHandleDir | null = null;

  minW = 200;
  minH = 200;
  maxW = Infinity;
  maxH = Infinity;
  windowW = window.innerWidth;
  windowH = window.innerHeight;

  w = 400;
  h = 400;
  x = 0;
  y = 0;

  // 保存拖动时的初始尺寸和位置
  startW = 0;
  startH = 0;
  startX = 0;
  startY = 0;

  // n 方向和 w 方向的限制坐标
  restrictX = 0;
  restrictY = 0;

  resizeHandleElements: HTMLElement[] = [];

  defaultZIndex = 1000;

  ngOnInit(): void {
    const { minWidth, minHeight, maxWidth, maxHeight } = this.overlayElement.style;

    const minSize = getElementSize(minWidth, minHeight);
    this.minW = minSize.w || 200;
    this.minH = minSize.h || 200;

    const maxSize = getElementSize(maxWidth, maxHeight);
    this.maxW = maxSize.w || Infinity;
    this.maxH = maxSize.h || Infinity;

    // 获取非 px 单位的尺寸信息
    this.w = this.overlayElement.offsetWidth || 400;
    this.h = this.overlayElement.offsetHeight || 400;

    // 弹窗初始化居中
    this.x = (this.windowW - this.w) / 2;
    this.y = (this.windowH - this.h) / 2;

    this.setActive();
  }

  ngAfterViewInit(): void {
    this.resizeHandleElements = Array.from(
      this.containerElement.querySelectorAll('.resizable-handle')
    );

    this.gesto = new Gesto(this.resizeHandleElements, {});

    // 移除 cdk-overlay-pane 的尺寸样式
    this.overlayElement.removeAttribute('style');
  }

  onResizeStart(e: PointerEvent, dir: resizableHandleDir) {
    this.dir = dir;

    this.startW = this.w;
    this.startH = this.h;
    this.startX = this.x;
    this.startY = this.y;

    this.restrictX = this.x + this.w - this.minW;
    this.restrictY = this.y + this.h - this.minH;

    this.gesto?.on('drag', this.onResize).on('dragEnd', this.onResizeEnd);
  }

  onResize = (e: OnEvent<OnDrag<Gesto>, Gesto>) => {
    // e 方向的宽度
    const eW = Math.min(
      Math.max(this.startW + e.distX, this.minW),
      this.maxW,
      this.windowW - this.startX
    );
    // s 方向的高度
    const sH = Math.min(
      Math.max(this.startH + e.distY, this.minH),
      this.maxH,
      this.windowH - this.startY
    );
    // w 方向的宽度
    const wW = Math.min(
      Math.max(this.startW - e.distX, this.minW),
      this.maxW,
      this.startW + this.startX
    );
    // n 方向的高度
    const nH = Math.min(
      Math.max(this.startH - e.distY, this.minH),
      this.maxH,
      this.startH + this.startY
    );
    // w 方向的 x 坐标，不能超出屏幕，参考 Mac 窗口行为
    const wX = Math.max(
      this.startW - e.distX > this.minW ? this.startX + e.distX : this.restrictX,
      this.startX + this.startW - this.maxW,
      0
    );
    // n 方向的 y 坐标，不能超出屏幕，参考 Mac 窗口行为
    const nY = Math.max(
      this.startH - e.distY > this.minH ? this.startY + e.distY : this.restrictY,
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
  };

  onResizeEnd = (e: OnEvent<OnDrag<Gesto>, Gesto>) => {
    this.gesto?.off('drag', this.onResize);
  };

  setActive() {
    // 先根据元素的 z-index 排序获得实例的顺序列表
    const openDialogRefs = this.getSortedDialogs();
    // 将激活的窗口移到数组的末尾
    const index = openDialogRefs.indexOf(this.dialogRef);
    openDialogRefs.splice(index, 1);
    openDialogRefs.push(this.dialogRef);
    // 按照数组顺序设置新的 z-index
    openDialogRefs.forEach((ref, index) => {
      ref.overlayRef.hostElement.style.zIndex = this.defaultZIndex + 1 + index + '';
      // 如果显示遮罩，则遮罩也要设置 z-index
      if (ref.overlayRef.backdropElement) {
        ref.overlayRef.backdropElement.style.zIndex = this.defaultZIndex + 1 + index + '';
      }
    });

    setTimeout(() => {
      openDialogRefs.forEach(ref => {
        (ref.containerInstance as RndDialogContainer).isActive = false;
      });
      this.isActive = true;
    });
  }

  getSortedDialogs() {
    return [...this.dialog.openDialogs].sort(
      (a, b) => +a.overlayRef.hostElement.style.zIndex - +b.overlayRef.hostElement.style.zIndex
    );
  }
}
