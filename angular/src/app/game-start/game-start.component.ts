import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Observable, of} from 'rxjs';
import {StartedGame} from '../app.model';

@Component({
  selector: 'app-game-start',
  templateUrl: './game-start.component.html',
  styleUrls: ['./game-start.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameStartComponent implements OnInit {
  startedGame$: Observable<StartedGame> = of();
  asHost: boolean;

  constructor(private location: Location) {}

  ngOnInit() {
    const state = this.location.getState() as any;
    if (state && state.startedGame && ('gameId' in state.startedGame)) {
      this.asHost = state.asHost;
      this.startedGame$ = of(state.startedGame as StartedGame);
    }
  }
}
