export enum Orientations {
  HORIZONTAL = 'HORIZONTAL',
  VERTICAL = 'VERTICAL'
}

export type OrientationsType = 'HORIZONTAL' | 'VERTICAL';

export interface ShipCellInfo {
  isFirstShipCellSequence: boolean;
  orientation: OrientationsType;
}
