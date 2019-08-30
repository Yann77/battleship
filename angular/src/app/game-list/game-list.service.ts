import {SocketClientService} from '../core/socket-client.service';
import {Injectable} from '@angular/core';
import {GameInputMessage, GameOutputMessage, JoinGameInputMessage} from './game-list.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Game} from '../app.model';

@Injectable({
  providedIn: 'root'
})
export class GameListService {
  constructor(private socketClient: SocketClientService) {
  }

  init(): void {
    this.socketClient.send(`/app/game/get`, {});
  }

  save(game: GameInputMessage): void {
    this.socketClient.send(`/app/game/create`, game);
  }

  findAll(): Observable<Array<Game>> {
    return this.socketClient
      .onMessage(`/topic/game/get`)
      .pipe(map((games: GameOutputMessage) => games.games));
  }

  join(gameId: number, username: string): void {
    const joinGameInputMessage = {gameId, username} as JoinGameInputMessage;
    this.socketClient.send(`/app/game/join`, joinGameInputMessage);
  }
}
