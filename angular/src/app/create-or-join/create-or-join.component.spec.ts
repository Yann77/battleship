import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrJoinComponent } from './create-or-join.component';

describe('CreateOrJoinComponent', () => {
  let component: CreateOrJoinComponent;
  let fixture: ComponentFixture<CreateOrJoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrJoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
