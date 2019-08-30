import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GameListService} from './game-list.service';
import {Observable} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Game, GameStatus} from '../app.model';
import {TakeUntilDestroyed} from '../core/take-until-destroyed/take-until-destroyed';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameListComponent extends TakeUntilDestroyed implements OnInit {
  displayedColumns: string[] = ['status', 'name', 'players', 'description', 'gameDt', 'star'];
  gameList$: Observable<Array<Game>>;
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private gameService: GameListService,
              private router: Router) {
    super();
  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required]
    });

    this.gameService.init();

    this.gameList$ = this.gameService.findAll().pipe(
      map((games) => {
        return games.map((game) => {
          let desc = '';
          let gameDt = '';
          switch (game.status) {
            case GameStatus.CREATED:
              desc = !game.guest ? '1 missing player to start...' : 'Should start soon...';
              break;
            case GameStatus.STARTED:
              desc = 'started at ';
              gameDt = new Date().toISOString();
              break;
            case GameStatus.ENDED:
              desc = 'ended at ' + new Date();
              gameDt = new Date().toISOString();
              break;
            default:
              break;
          }
          return Object.assign(game, {name: `Game #${game.gameId}`, description: desc, gameDt});
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

  onJoining(game: Game) {
    this.gameService.join(game.gameId, this.registerForm.value.username);
    this.router.navigateByUrl('/game-start', { state: { gameId: game.gameId } }).then(() => {
      this.onReset();
    });
  }
}
