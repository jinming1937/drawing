
export function initImportJSON(fn: Function) {
  const dom = document.getElementById('import-data') as HTMLInputElement;
  if (dom) {
    dom.addEventListener('change', (e) => {
      if (dom.files && dom.files.length > 0) {
        const reader = new FileReader();//新建一个FileReader
        reader.readAsText(dom.files[0], "UTF-8");//读取文件
        reader.onload = (evt) => { //读取完文件之后会回来这里
          var fileString = evt.target?.result; // 读取文件内容
          try {
            if (typeof fileString === 'string') {
              const val = JSON.parse(fileString || '[]');
              if (Array.isArray(val) && val.length > 0) {
                fn(val);
              } else {
                alert(`file content is not a Array, or Empty Array, file content should be '
                  [
                    {
                      "type": "line" | "rect" | "pen" | "txt" | "arrow";
                      "color": string; // color like #fff, red, ...etc;
                      "lineWidth"?: number; // 1,2,3
                      "shape"?: number[]; // for type except txt
                      "text"?: string; // for type txt
                    }
                  ]
                '`);
              }
            } else {
              alert('file type error: file is not a UTF-8 txt');
            }
          } catch (error) {
            alert('analyse file error:' + error);
          }
        }
        reader.onerror = (ev: ProgressEvent<FileReader>) => {
          alert(ev);
        }
      };
    });
  }
}
