import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Observable, of} from 'rxjs';
import {Cell, GameStatus, StartedGame} from '../app.model';
import {GameStartService} from './game-start.service';
import {TakeUntilDestroyed} from '../core/take-until-destroyed/take-until-destroyed';
import {AppService} from '../app.service';

@Component({
  selector: 'app-game-start',
  templateUrl: './game-start.component.html',
  styleUrls: ['./game-start.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameStartComponent extends TakeUntilDestroyed implements OnInit {
  startedGame$: Observable<StartedGame> = of();
  asHost: boolean;

  constructor(private location: Location,
              private gameStartService: GameStartService,
              private appService: AppService) {
    super();
  }

  ngOnInit() {
    const state = this.location.getState() as any;
    if (state && ('gameId' in state) && ('asHost' in state)) {
      this.asHost = state.asHost;
      this.startedGame$ = this.gameStartService.getGame(state.gameId);
      this.appService.watch(state.gameId);
    }
  }

  onShipFired(cell: Cell, gameId: number, status: GameStatus) {
    if ((status === GameStatus.HOST && this.asHost) || (status === GameStatus.GUEST && !this.asHost)) {
      this.gameStartService.fire(gameId, cell);
    }
  }

  getStatusMessage(startedGame: StartedGame) {
    if (!startedGame.guest) {
      return `<img width="420" src="../assets/images/waiting.png" alt="Waiting for player"/>`;
    }
    if (startedGame.status === GameStatus.ENDED) {
      const winnerName = this.getWinnerName(startedGame);
      if (winnerName) {
        return 'The winner is ' + winnerName + ' !!!! Congrats !';
      }
      return 'Game is ENDED without a winner...'; // Should never happened
    }
    return this.asHost ? startedGame.host.username + ' VS ' + startedGame.guest.username :
      startedGame.guest.username + ' VS ' + startedGame.host.username;
  }

  getLightClass(owner: boolean, gameStatus: GameStatus) {
    if (owner) {
      if (gameStatus === GameStatus.HOST) {
        return {'green-light-on': true};
      } else {
        return {'green-light-off': true};
      }
    } else {
      if (gameStatus === GameStatus.GUEST) {
        return {'red-light-on': true};
      } else {
        return {'red-light-off': true};
      }
    }
  }

  private getWinnerName(startedGame: StartedGame) {
    if (this.areAllShipTouched(startedGame.host.cellList)) {
      return startedGame.guest.username;
    }
    if (this.areAllShipTouched(startedGame.guest.cellList)) {
      return startedGame.host.username;
    }
    return undefined;
  }

  private areAllShipTouched(cellList: Array<Cell>) {
    return cellList.filter((cell) => cell.touched).length ===
      cellList.filter(cell => cell.type && cell.type !== 'MISSED').length;
  }
}
