import { bubble } from './bubble';

const HELP_TXT = '在【线段，矩形，画笔，文本，箭头】等输入状态下，鼠标点击拖动开始输入，松开结束输入;快捷键：⌘+A:全选,⌘+C:复制,⌘+V粘贴,⌘+Y撤销';

export function initHelp() {
  const help = document.getElementById('help');
  const {x, y, width, height} = (help as HTMLLabelElement).getBoundingClientRect();
  const dom = bubble(HELP_TXT, { x, y: y - 6, width, height }, 'help') as HTMLDivElement;
  help?.addEventListener('mouseover', (e) => {
    dom.style.display = 'block';
  });
  help?.addEventListener('mouseout', (e) => {
    dom.style.display = 'none';
  });
}
