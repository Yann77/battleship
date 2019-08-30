import {SocketClientService} from '../core/socket-client.service';
import {Injectable} from '@angular/core';
import {GameInputMessage, GameOutputMessage, JoinGameInputMessage} from './game-list.model';
import {Observable} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {Game} from '../app.model';
import {TakeUntilDestroyed} from '../core/take-until-destroyed/take-until-destroyed';

@Injectable({
  providedIn: 'root'
})
export class GameListService extends TakeUntilDestroyed {
  constructor(private socketClient: SocketClientService) {
    super();
  }

  init(): void {
    this.socketClient.send(`/app/game/get`, {}).subscribe();
  }

  save(game: GameInputMessage): void {
    this.socketClient.send(`/app/game/create`, game).subscribe();
  }

  findAll(): Observable<Array<Game>> {
    return this.socketClient
      .onMessage(`/topic/game/get`)
      .pipe(map((games: GameOutputMessage) => games.games));
  }

  join(gameId: number, username: string): Observable<any> {
    const joinGameInputMessage = {gameId, username} as JoinGameInputMessage;
    return this.socketClient.send(`/app/game/join`, joinGameInputMessage);
  }
}
