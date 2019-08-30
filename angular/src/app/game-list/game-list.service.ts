import {SocketClientService} from '../core/socket-client.service';
import {Injectable} from '@angular/core';
import {GameInputMessage, GameOutputMessage, JoinGameInputMessage} from './game-list.model';
import {Observable} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {Game, StartedGame} from '../app.model';
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

  save(username: string): void {
    this.socketClient.send(`/app/game/create`, username).subscribe();
  }

  findAll(): Observable<Array<Game>> {
    return this.socketClient
      .onMessage(`/topic/game/get`)
      .pipe(map((games: GameOutputMessage) => games.games));
  }

  join(gameId: number, username: string): void {
    this.socketClient.send(`/app/game/join/${gameId}`, username).subscribe();
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

  // gameCreated(): Observable<any> {
  //   return this.socketClient
  //     .onMessage(`/topic/game/created`)
  //     .pipe(
  //       map((game: Game) => {
  //         return this.socketClient.send(`/app/game/get/${game.gameId}`,{}).subscribe();
  //       })
  //     );
  // }


}
