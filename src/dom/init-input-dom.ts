
/**
 * 初始化一个颜色dom
 * @param {Object} colorDom 颜色DOM
 */
export function initInputDom(colorDom: HTMLInputElement): [HTMLTextAreaElement, HTMLDivElement] {
  const textarea = document.createElement('textarea');
  textarea.id = 'textarea-input';
  textarea.style.background = "rgb(255 255 255 / 70%)";
  textarea.style.position = "absolute";
  textarea.style.left = '0';
  textarea.style.top = '0';
  textarea.style.color = colorDom.value;
  textarea.style.fontFamily = 'serif';
  textarea.style.fontSize = '16px';
  textarea.style.zIndex = '1000';
  textarea.style.border = 'none';
  textarea.style.outline = 'none';
  textarea.style.resize = 'none';
  textarea.style.width = '150px';
  textarea.style.height = '40px';
  textarea.style.borderRadius = '2px';
  textarea.style.display = 'none';
  textarea.placeholder = '请输入少于30个字';

  const textareaMask = document.createElement('div');
  textareaMask.id = 'textarea-mask';
  textareaMask.style.display = 'none';
  textareaMask.style.position = 'absolute';
  textareaMask.style.width = '100%';
  textareaMask.style.height = '100%';
  textareaMask.style.top = '0';
  textareaMask.style.left = '0';
  textareaMask.style.background = 'transparent';

  document.body.append(textarea);
  document.body.append(textareaMask);
  return [textarea, textareaMask];
}

/**
* 展示文本输入
* @param {number} x x position
* @param {number} y y position
* @param {string} value value string
*/
export function showInput(x: number, y: number, value?: string) {
 const colorDom = document.getElementById('color') as HTMLInputElement;
 const textarea = document.getElementById('textarea-input') as HTMLTextAreaElement;
 const textareaMask = document.getElementById('textarea-mask');
 if (textareaMask) textareaMask.style.display = 'block';
 if (textarea) {
   textarea.style.display = 'block';
   textarea.style.left = `${x}px`;
   textarea.style.top = `${y - 17}px`;
   textarea.style.color = colorDom.value;
   textarea.value = value || '';
   setTimeout(() => textarea.focus(), 0)
 }
}
