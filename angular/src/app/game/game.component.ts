import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Game, GameStatus} from './game.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GameService} from './game.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {
  displayedColumns: string[] = ['status', 'name', 'players', 'description', 'gameDt', 'star'];
  gameList$: Observable<Array<Game>>;
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private gameService: GameService) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required]
    });

    this.gameList$ = this.gameService.findAll().pipe(
      map((games) => {
        return games.map((game) => {
          if (!game.status) {
            game.status = GameStatus.CREATED;
          }
          let desc = '';
          switch (game.status) {
            case GameStatus.CREATED:
              desc = !game.guest ? '1 missing player to start...' : 'Should start soon...';
              break;
            case GameStatus.STARTED:
              desc = 'started at ' + new Date();
              break;
            case GameStatus.ENDED:
              desc = 'ended at ' + new Date();
              break;
            default:
              break;
          }
          return Object.assign(game, {name: `Game #${game.gameId}`, description: desc});
        });
      })
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.gameService.save(this.registerForm.value);
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  onJoining(gameId) {
    alert('Joining ' + gameId);
  }

}
