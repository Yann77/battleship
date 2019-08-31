import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GameListService} from './game-list.service';
import {Observable} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Game, GameStatus} from '../app.model';
import {TakeUntilDestroyed} from '../core/take-until-destroyed/take-until-destroyed';
import {AppService} from '../app.service';

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
              private gameListService: GameListService,
              private appService: AppService,
              private router: Router) {
    super();
  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required]
    });

    this.appService.watch();

    this.gameList$ = this.gameListService.findAll().pipe(
      map((games) => {
        return games.map((game) => {
          let desc = '';
          let gameDt = '';
          switch (game.status) {
            case GameStatus.CREATED:
              desc = !game.guest ? '1 missing player to start...' : 'Should start soon...';
              break;
            case GameStatus.HOST:
              desc = 'host is playing since ';
              gameDt = new Date().toISOString();
              break;
            case GameStatus.GUEST:
              desc = 'guest is playing since ';
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

    this.gameListService.create().pipe(takeUntil(this.destroyed$)).subscribe( (game) => {
      this.appService.watch();
      this.router.navigateByUrl('/game-start', { state: {gameId: game.gameId, asHost: true}}).then(() => {
        this.onReset();
      });
    });

    this.gameListService.save(this.registerForm.value.username);
    this.onReset();
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  onJoining(game: Game) {
    this.gameListService.join(game.gameId, this.registerForm.value.username);
    this.router.navigateByUrl('/game-start', {state: {gameId: game.gameId, asHost: false }}).then(() => {
      this.onReset();
    });
  }

  showGame(gameId: number) {
    this.appService.watch();
    this.router.navigateByUrl('/game-start', {state: {gameId, asHost: false }}).then(() => {
      this.onReset();
    });
  }
}
