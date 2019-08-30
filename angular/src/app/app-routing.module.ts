import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameListComponent} from './game-list/game-list.component';
import {GameStartComponent} from './game-start/game-start.component';


const routes: Routes = [
  { path: 'game-list', component: GameListComponent },
  { path: 'game-start', component: GameStartComponent},
  {
    path: '**',
    redirectTo: 'game-list'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
