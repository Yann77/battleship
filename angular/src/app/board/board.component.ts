import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {BoardCell} from './board.model';

export const DEFAULT_MATRIX_SIZE = 10;

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class BoardComponent implements OnInit {
  @Input()
  matrixSize = DEFAULT_MATRIX_SIZE;

  boardCells: BoardCell[][] = [];

  constructor() { }

  ngOnInit() {
    for(let i: number = 0; i < this.matrixSize; i++) {
      this.boardCells[i] = [];
      for(let j: number = 0; j< 10; j++) {
        this.boardCells[i][j] = new BoardCell(i, j);
      }
    }
  }
}
