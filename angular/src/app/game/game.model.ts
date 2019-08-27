export enum GameStatus {
  CREATED = 'created',
  STARTED = 'started',
  ENDED = 'ended'
}

export interface Game {
  id: number;
  status: GameStatus;
  name: string;
  host: Player;
  guest?: Player;
  description: string;
  gameDt?: Date;
}

export interface Player {
  id: number;
  name: string;
}

export interface GameInputMessage {
  username: string;
}

