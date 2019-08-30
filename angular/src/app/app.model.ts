export enum GameStatus {
  CREATED = 'CREATED',
  STARTED = 'STARTED',
  ENDED = 'ENDED'
}

export interface Game {
  gameId: number;
  status: GameStatus;
  name?: string;
  host: Board;
  guest?: Board;
  description?: string;
  gameDt?: Date;
}

export interface Board {
  boardId: number;
  username: string;
  cellList: Array<Cell>;
}

export interface Cell {
  coordinateY: number;
  coordinateX: number;
  type: string;
  touched: boolean;
}

export interface StartedGame {
  gameId: number;
  status: GameStatus;
  host: Board;
  guest: Board;
}

export interface CellCoord {
  coordinateY: number;
  coordinateX: number;
}


