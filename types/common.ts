
export type IShapeType = 'line' | 'rect' | 'pen' | 'txt' | 'arrow';

export type Pen = {
  type: 'pen';
  color: string;
  lineWidth: number;
  shape: number[];
  lines: Array<number[]>;
}

export type Common = {
  type: 'line' | 'rect' | 'arrow';
  color: string;
  lineWidth: number;
  shape: number[];
}

export type Txt = {
  type: 'txt';
  color: string;
  lineWidth: number;
  shape: number[];
  text: string;
}

export type IDrawData = Common | Pen | Txt;
