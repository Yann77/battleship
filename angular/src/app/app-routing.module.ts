import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateOrJoinComponent} from './create-or-join/create-or-join.component';
import {InitBoardComponent} from './init-board/init-board.component';


const routes: Routes = [
  { path: 'games', component: CreateOrJoinComponent },
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
