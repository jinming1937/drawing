import { bubble } from './bubble';

export function initHelp() {
  const help = document.getElementById('help');
  const {x, y, width} = (help as HTMLLabelElement).getBoundingClientRect();
  const dom = bubble('根据【线段、矩形、画笔、文本、箭头】画图，鼠标点击开始，松开鼠标结束，可切换颜色，线段粗细，显示隐藏坐标轴，主题色等', { x: x - width / 2, y }) as HTMLDivElement;
  help?.addEventListener('mouseover', (e) => {
    dom.style.display = 'block';
  });
  help?.addEventListener('mouseout', (e) => {
    dom.style.display = 'none';
  });

  // help?.
}
