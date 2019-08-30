import { Injectable } from '@angular/core';
import {SocketClientService} from '../core/socket-client.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CellCoord, StartedGame} from '../app.model';
import {TakeUntilDestroyed} from '../core/take-until-destroyed/take-until-destroyed';

@Injectable({
  providedIn: 'root'
})
export class GameStartService extends TakeUntilDestroyed {
  constructor(private socketClient: SocketClientService) {
    super();
  }

  init(gameId): void {
    this.socketClient.send(`/app/game/get/${gameId}`, {}).subscribe();
  }

  fire(gameId, x, y): void {
    this.socketClient.send(`/app/game/get/${gameId}`, { coordinateX: x, coordinateY: y } as CellCoord).subscribe();
  }
}
