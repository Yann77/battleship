import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-init-board',
  templateUrl: './init-board.component.html',
  styleUrls: ['./init-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InitBoardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
