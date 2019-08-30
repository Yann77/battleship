import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameStartComponent } from './game-start/game-start.component';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatMenuModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    GameListComponent,
    GameStartComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
