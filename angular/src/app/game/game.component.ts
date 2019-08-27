import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Game, GameStatus} from './game.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GameService} from './game.service';

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

  constructor(private formBuilder: FormBuilder,
              private gameService: GameService) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required]
    });

    this.gameList = [
      {id: 1, status: GameStatus.STARTED, name: 'Game #1', host: { id: 1, name: 'Brice'}, guest: {id: 2, name: 'Arbia'}, gameDt: new Date()},
      {id: 2, status: GameStatus.CREATED, name: 'Game #2', host: {id: 3, name: 'Yannick'}, gameDt: new Date()},
      {id: 3, status: GameStatus.ENDED, name: 'Game #3', host: {id: 4, name: 'Chris'}, guest: {id: 5, name: 'Cedric'}, gameDt: new Date()},
      {id: 4, status: GameStatus.STARTED, name: 'Game #4', host: {id: 6, name: 'Vincent'}, guest: {id: 7, name: 'Jimmy'}, gameDt: new Date()},
    ].map(game => {
      let desc = '';
      switch (game.status) {
        case GameStatus.CREATED:
          desc = !game.guest ? '1 left to start...' : 'Should start soon...';
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
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));

    this.gameService.save(this.registerForm.value);
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
