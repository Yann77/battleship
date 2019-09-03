import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Board, Cell, ShipType} from '../app.model';

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
  asHost: boolean;

  @Input()
  matrixSize = DEFAULT_MATRIX_SIZE;

  defaultBoardCells: Cell[][] = [];
  boardDataCells: Map<string, Cell> = new Map();

  constructor() { }

  ngOnInit() {
    if (this.boardData && this.boardData.cellList) {
      this.boardData.cellList.map((cell) => this.boardDataCells.set(`${cell.coordinateX}|${cell.coordinateY}`, cell));
    }

    for (let i = 0; i < this.matrixSize; i++) {
      this.defaultBoardCells[i] = [];
      for (let j = 0; j < this.matrixSize; j++) {
        this.defaultBoardCells[i][j] = {coordinateX: j, coordinateY: i, type: undefined, touched: false} as Cell;
      }
    }
  }

  getCell(x: number, y: number): Cell {
    return this.boardDataCells.get(`${x}|${y}`);
  }

  getShipClass(x: number, y: number, shipType: ShipType) {
    let shipClass = '';
    const shipClassCss = {};
    switch (shipType) {
      case ShipType.BATTLESHIP:
        shipClass = 'battleship'
        break;
      case ShipType.CARRIER:
        shipClass = 'aircraft_carrier';
        break;
      case ShipType.DESTROYER:
        shipClass = 'destroyer';
        break;
      case ShipType.PATROL_BOAT:
        shipClass = 'patrol_boat';
        break;
      case ShipType.SUBMARINE:
        shipClass = 'submarine';
        break;
    }
    if (this.isHorizontalShip(x, y)) {
      shipClassCss[shipClass.toLowerCase() + '_horizontal'] = true;
    } else {
      shipClassCss[shipClass.toLowerCase() + '_vertical'] = true;
    }
    return shipClassCss;
  }

  private isHorizontalShip(x: number, y: number): boolean {
    let topType;
    let bottomType;
    let leftType;
    let rightType;
    const currentCell = this.boardDataCells.get(`${x}|${y}`);
    const currentType = currentCell && currentCell || undefined;

    if (y < DEFAULT_MATRIX_SIZE - 1) {
      const bottomCell = this.boardDataCells.get(`${x}|${y + 1}`);
      bottomType = bottomCell && bottomCell.type || undefined;
    }

    if (y > 0) {
      const topCell = this.boardDataCells.get(`${x}|${y - 1}`);
      topType = topCell && topCell.type || undefined;
    }

    if (x < DEFAULT_MATRIX_SIZE - 1) {
      const rightCell = this.boardDataCells.get(`${x + 1}|${y}`);
      rightType = rightCell && rightCell.type || undefined;
    }

    if (x > 0) {
      const leftCell = this.boardDataCells.get(`${x - 1}|${y}`);
      leftType = leftCell && leftCell.type || undefined;
    }

    return currentType && ((!leftType && rightType) || (leftType && !rightType)) &&
      (!bottomType || bottomType !== currentType) && (!topType || topType !== currentType);
  }
}
