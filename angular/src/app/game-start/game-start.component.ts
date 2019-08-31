import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Observable, of} from 'rxjs';
import {StartedGame} from '../app.model';
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
  ownerUsername: string;
  guestUsername: string;

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
}
