import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
  EventEmitter
} from '@angular/core';
import {Board, Cell, ShipType} from '../app.model';
import {Orientations, ShipCellInfo} from './board.model';

export const DEFAULT_MATRIX_SIZE = 10;

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class BoardComponent implements OnInit, OnChanges {
  @Input()
  boardData: Board;

  @Input()
  isOwner = true;

  @Input()
  matrixSize = DEFAULT_MATRIX_SIZE;

  @Output()
  shipFired: EventEmitter<Cell> = new EventEmitter<Cell>();

  defaultBoardCells: Cell[][] = [];
  boardDataCells: Map<string, Cell> = new Map();

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < this.matrixSize; i++) {
      this.defaultBoardCells[i] = [];
      for (let j = 0; j < this.matrixSize; j++) {
        this.defaultBoardCells[i][j] = {coordinateX: j, coordinateY: i, type: undefined, touched: false} as Cell;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.boardData && changes.boardData.currentValue) {
      const boardData = changes.boardData.currentValue;
      if (boardData && boardData.cellList) {
        boardData.cellList.map((cell) => this.boardDataCells.set(`${cell.coordinateX}|${cell.coordinateY}`, cell));
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
        shipClass = 'battleship';
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

    const shipCellInfo: ShipCellInfo = this.isFirstShipCellSequence(x, y);
    if (shipCellInfo.isFirstShipCellSequence) {
      if (shipCellInfo.orientation === Orientations.HORIZONTAL) {
        shipClassCss[shipClass.toLowerCase() + '_horizontal'] = true;
      } else {
        shipClassCss[shipClass.toLowerCase() + '_vertical'] = true;
      }
    }
    return shipClassCss;
  }

  onShipFired(cell: Cell) {
    if (!this.isOwner) {
      this.shipFired.emit(cell);
    }
  }

  private isFirstShipCellSequence(x: number, y: number): ShipCellInfo {
    let topType;
    let leftType;
    let rightType;
    const currentCell = this.boardDataCells.get(`${x}|${y}`);
    const currentType = currentCell && currentCell.type || undefined;

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

    const orientation = currentType &&
      ((leftType && leftType === currentType) || (rightType && rightType === currentType)) ?
      Orientations.HORIZONTAL : Orientations.VERTICAL;

    let isFirstShipCellSequence;
    if (orientation === Orientations.HORIZONTAL) {
      isFirstShipCellSequence = currentType &&
        (!leftType || leftType !== currentType);
    } else {
      isFirstShipCellSequence = currentType &&
        (!topType || topType !== currentType);
    }
    return {isFirstShipCellSequence, orientation} as ShipCellInfo;
  }
}
