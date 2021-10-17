/**
 * 导出JSON文件
 * @param fileName 文件名
 * @param data 数据（JSON string）
 */
export function downFile(fileName: string, data: string) {
  const urlObject = URL;
  const export_blob = new Blob([data]);
  const save_link = document.createElement<'a'>('a');
  save_link.href = urlObject.createObjectURL(export_blob);
  save_link.download = fileName;
  save_link.click();
}
