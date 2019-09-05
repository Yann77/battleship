import { Injectable } from '@angular/core';
import {SocketClientService} from '../core/socket-client.service';
import {StartedGame} from '../app.model';
import {TakeUntilDestroyed} from '../core/take-until-destroyed/take-until-destroyed';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameStartService extends TakeUntilDestroyed {
  constructor(private socketClient: SocketClientService) {
    super();
  }

  fire(gameId, cell): void {
    this.socketClient.send(`/app/game/fire/${gameId}`, cell);
  }

  getGame(gameId): Observable<StartedGame> {
    return this.socketClient
      .onMessage(`/topic/game/get/${gameId}`)
      .pipe(
        map((game: StartedGame) => {
          return game;
        })
      );
  }
}
