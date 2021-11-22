export function copy<T>(originObj: T): T {
  const obj: T = {} as T;
  function di_gui<T>(origin: T, copier: T) {
    Object.keys(origin).forEach((key) => {
      if((origin as Object).hasOwnProperty(key)) {
        if (typeof origin[key] === 'object') {
          if (Array.isArray(origin[key])) {
            copier[key] = []
          } else {
            copier[key] = {};
          }
          di_gui(origin[key], copier[key]);
        } else {
          copier[key] = origin[key];
        }
      }
    })
  }
  di_gui(originObj, obj);
  return obj;
}
