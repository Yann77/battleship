export enum GameStatus {
  CREATED = 'created',
  STARTED = 'started',
  ENDED = 'ended'
}

export interface Game {
  gameId: number;
  status: GameStatus;
  name?: string;
  host: Player;
  guest?: Player;
  description?: string;
  gameDt?: Date;
}

export interface Player {
  userId: number;
  username: string;
}

export interface GameInputMessage {
  username: string;
}

export interface GameOutputMessage {
  games: Array<Game>;
}


export interface JoinGameInputMessage {
  username: string;
  gameId: number;
}
