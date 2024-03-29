
// declare module 'URL' {
//   const URL: {
//     createObjectURL: (b: Blob) => string;
//   }
//   export default URL;
// }

declare interface MouseEvent extends UIEvent {
  layerX: number;
  layerY: number;
}

declare interface Window {
  coreData: any;
  cacheData: any;
  isDebug: boolean;
}
