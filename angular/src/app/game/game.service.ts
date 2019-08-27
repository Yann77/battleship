import {SocketClientService} from '../core/socket-client.service';
import {Injectable} from '@angular/core';
import {Game, GameInputMessage, GameOutputMessage} from './game.model';
import {Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private socketClient: SocketClientService) {
  }

  save(game: GameInputMessage): void {
    this.socketClient.send(`/app/game/create`, game);
  }

  findAll(): Observable<Array<Game>> {
    return this.socketClient
      .onMessage('/topic/game/created')
      .pipe(first(), map((games: GameOutputMessage) => games.games));
  }
}
