import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {GameStartService} from './game-start.service';
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

  constructor(private location: Location) {}

  ngOnInit() {
    const state = this.location.getState() as any;
    if (state && ('gameId' in state)) {
      this.startedGame$ = of(state as StartedGame);
    }
  }
}
