import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Game, GameStatus} from './game.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {
  displayedColumns: string[] = ['status', 'name', 'players', 'description', 'gameDt', 'star'];
  gameList: Array<Game>;
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      playerName: ['', Validators.required]
    });

    this.gameList = [
      {status: GameStatus.STARTED, name: 'Game #1', players: ['Bris', 'Arbia'], gameDt: new Date()},
      {status: GameStatus.CREATED, name: 'Game #2', players: ['Yannick'], gameDt: new Date()},
      {status: GameStatus.ENDED, name: 'Game #3', players: ['Chris', 'Cedric'], gameDt: new Date()},
      {status: GameStatus.STARTED, name: 'Game #4', players: ['Vincent', 'Jimmy'], gameDt: new Date()},
    ].map(game => {
      let desc = '';
      switch (game.status) {
        case GameStatus.CREATED:
          desc = game.players.length < 2 ? (2 - game.players.length) + ' left to start...' : 'Should start soon...';
          break;
        case GameStatus.STARTED:
          desc = 'started at ';
          break;
        case GameStatus.ENDED:
          desc = 'ended at ';
          break;
        default:
          break;
      }
      return Object.assign(game, {description: desc});
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
