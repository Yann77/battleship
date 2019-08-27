import {SocketClientService} from '../core/socket-client.service';
import {Injectable} from '@angular/core';
import {GameInputMessage} from './game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private socketClient: SocketClientService) {
  }

  save(game: GameInputMessage): void {
    this.socketClient.send(`/app/game/create`, game);
  }
}
