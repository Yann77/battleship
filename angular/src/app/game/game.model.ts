export enum GameStatus {
  CREATED = 'created',
  STARTED = 'started',
  ENDED = 'ended'
}

export interface Game {
  status: GameStatus;
  name: string;
  players: Array<string>;
  description: string;
  gameDt: Date;
}
