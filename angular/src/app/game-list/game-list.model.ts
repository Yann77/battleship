import {Game} from '../app.model';

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
