import { TestBed } from '@angular/core/testing';

import { GameStartService } from './game-start.service';

describe('GameStartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameStartService = TestBed.get(GameStartService);
    expect(service).toBeTruthy();
  });
});
