import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitBoardComponent } from './init-board.component';

describe('InitBoardComponent', () => {
  let component: InitBoardComponent;
  let fixture: ComponentFixture<InitBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
