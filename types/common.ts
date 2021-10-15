
export type IShapeType = 'line' | 'rect' | 'pen' | 'txt' | 'arrow' | 'hand';

export type Pen = {
  type: 'pen';
  color: string;
  lineWidth: number;
  shape: number[];
  lines: Array<number[]>;
  isActive?: boolean;
}

export type Common = {
  type: 'line' | 'rect' | 'arrow';
  color: string;
  lineWidth: number;
  shape: number[];
  isActive?: boolean;
}

export type Txt = {
  type: 'txt';
  color: string;
  lineWidth: number;
  shape: number[];
  text: string;
  isActive?: boolean;
}

export type IDrawData = Common | Pen | Txt;
