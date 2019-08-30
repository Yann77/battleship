import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Board, Cell} from '../app.model';
export const DEFAULT_MATRIX_SIZE = 10;

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class BoardComponent implements OnInit {
  @Input()
  boardData: Board;

  @Input()
  matrixSize = DEFAULT_MATRIX_SIZE;

  boardCells: Cell[][] = [];

  constructor() { }

  ngOnInit() {
    console.log(this.boardData);

    for (let i = 0; i < this.matrixSize; i++) {
      this.boardCells[i] = [];
      for (let j = 0; j < this.matrixSize; j++) {
        this.boardCells[i][j] = {coordinateX: j, coordinateY: i} as Cell;
      }
    }
  }
}
