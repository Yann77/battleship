import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-create-or-join',
  templateUrl: './create-or-join.component.html',
  styleUrls: ['./create-or-join.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateOrJoinComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
