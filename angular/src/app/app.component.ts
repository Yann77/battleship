import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {TakeUntilDestroyed} from './core/take-until-destroyed/take-until-destroyed';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent  extends TakeUntilDestroyed implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
