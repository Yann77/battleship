import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStartComponent } from './game-start.component';

describe('InitBoardComponent', () => {
  let component: GameStartComponent;
  let fixture: ComponentFixture<GameStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
