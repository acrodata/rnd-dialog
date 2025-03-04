/**
 * 将任意单位 (%,vw,rem) 的 CSS 宽高转换成数值 (px)
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
