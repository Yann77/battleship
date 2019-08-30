import { Injectable } from '@angular/core';
import {SocketClientService} from '../core/socket-client.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CellCoord, StartedGame} from '../app.model';

@Injectable({
  providedIn: 'root'
})
export class GameStartService {
  constructor(private socketClient: SocketClientService) {
  }

  init(gameId): void {
    this.socketClient.send(`/app/game/get/${gameId}`, {});
  }

  fire(gameId, x, y): void {
    this.socketClient.send(`/app/game/get/${gameId}`, { coordinateX: x, coordinateY: y } as CellCoord);
  }

  find(gameId): Observable<StartedGame> {
    return this.socketClient
      .onMessage(`/topic/game/get/${gameId}`)
      .pipe(map((game: StartedGame) => game));
  }
}
