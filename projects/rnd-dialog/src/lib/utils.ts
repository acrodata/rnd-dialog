import { RndDialogBoundaryRect } from './rnd-dialog-config';

/**
 * Convert CSS dimensions with arbitrary units (%, vw, rem) to pixel values (px).
 *
 * @param width
 * @param height
 * @returns
 */
export function getElementSize(width: string, height: string) {
  const div = document.createElement('div');
  div.style.cssText = `position: absolute; top: -9999px; width: ${width}; height: ${height}`;
  document.body.appendChild(div);
  const divWidth = div.offsetWidth;
  const divHeight = div.offsetHeight;
  document.body.removeChild(div);
  return { w: divWidth, h: divHeight };
}

/**
 * Convert the boundary parameter into an absolute coordinate rectangle.
 *
 * @param boundary
 * @returns
 */
export function getBoundaryRect(
  boundary?: string | HTMLElement | RndDialogBoundaryRect
): RndDialogBoundaryRect | null {
  if (boundary instanceof HTMLElement || typeof boundary === 'string') {
    const el = typeof boundary === 'string' ? document.querySelector(boundary) : boundary;
    if (el) {
      const rect = el.getBoundingClientRect();
      const { top, bottom, left, right } = rect;
      return { top, bottom, left, right };
    }
  } else if (typeof boundary === 'object' && boundary != null) {
    return {
      top: boundary.top,
      left: boundary.left,
      right: boundary.right != null ? window.innerWidth - boundary.right : undefined,
      bottom: boundary.bottom != null ? window.innerHeight - boundary.bottom : undefined,
    };
  }
  return null;
}
