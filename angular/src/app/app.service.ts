import { Injectable } from '@angular/core';
import {SocketClientService} from './core/socket-client.service';
import {TakeUntilDestroyed} from './core/take-until-destroyed/take-until-destroyed';

@Injectable({
  providedIn: 'root'
})
export class AppService extends TakeUntilDestroyed {
  constructor(private socketClient: SocketClientService) {
    super();
  }

  watch(gameId?: number): void {
    this.socketClient.send(gameId ? `/app/game/get/${gameId}` : `/app/game/get`, {});
  }
}
