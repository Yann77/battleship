import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameComponent} from './game/game.component';
import {InitBoardComponent} from './init-board/init-board.component';


const routes: Routes = [
  { path: 'games', component: GameComponent },
  { path: 'init-board', component: InitBoardComponent},
  {
    path: '**',
    redirectTo: 'games'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
