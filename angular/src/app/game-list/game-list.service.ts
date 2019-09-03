import {SocketClientService} from '../core/socket-client.service';
import {Injectable} from '@angular/core';
import {GameOutputMessage} from './game-list.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Game} from '../app.model';
import {TakeUntilDestroyed} from '../core/take-until-destroyed/take-until-destroyed';

@Injectable({
  providedIn: 'root'
})
export class GameListService extends TakeUntilDestroyed {
  constructor(private socketClient: SocketClientService) {
    super();
  }

  save(username: string): void {
    this.socketClient.send(`/app/game/create`, username);
  }

  findAll(): Observable<Array<Game>> {
    return this.socketClient
      .onMessage(`/topic/game/get`)
      .pipe(map((games: GameOutputMessage) => games.games));
  }

  create(): Observable<Game> {
    return this.socketClient
    .onMessage(`/user/topic/game/created`)
    .pipe(map((game) => game));
  }

  join(gameId: number, username: string): void {
    this.socketClient.send(`/app/game/join/${gameId}`, username);
    this.socketClient.send(`/app/game/get/${gameId}`, {});
  }
}
