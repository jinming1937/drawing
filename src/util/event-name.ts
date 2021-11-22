export enum KeyEventName {
  /** 全选 */
  selectAll = 'select_all',
  /** 保存 */
  save = 'save',
  /** 前进 */
  forward = 'forward',
  /**
   * 后退：ctrl+z
   * 指操作级的后退，撤销了画，撤销了删除，等
   * */
  back = 'back',
  /** 复制 */
  copy = 'copy',
  /** 粘贴 */
  parse = 'parse',
  /** 剪切 */
  shear = 'shear',
  /** 清空 */
  clear = 'clear',
  /** 切换输入模式: 1从右往左，2从左往右 */
  changeType = 'changeType',
  /** 删除 */
  delete = 'delete',
  /** 删除or撤销（退出输入状态）or回退 */
  escape = 'escape'
}
