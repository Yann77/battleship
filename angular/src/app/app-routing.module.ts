import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameListComponent} from './game-list/game-list.component';
import {GameStartComponent} from './game-start/game-start.component';
import {HomeComponent} from './home/home.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'game-list', component: GameListComponent },
  { path: 'game-start', component: GameStartComponent},
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
