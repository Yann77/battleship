import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TakeUntilDestroyed } from './take-until-destroyed';

@Component({
  selector: 'app-child-to-test',
  template: '<div></div>'
})
class ChildToTestComponent extends TakeUntilDestroyed implements OnInit {
  @Input()
  valueChild$: Observable<number>;
  @Output()
  increaseValue = new EventEmitter();

  ngOnInit() {
    this.valueChild$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.increaseValue.emit();
    });
  }
}

@Component({
  selector: 'app-parent-to-test',
  template: '<app-child-to-test #child *ngIf="show" (increaseValue)="increaseValue()" [valueChild$]="pushValue$"></app-child-to-test>'
})
class ParentToTestComponent {
  public pushValue: Subject<number> = new Subject<number>();
  public pushValue$: Observable<number>;
  public show = true;
  public counter = 0;

  constructor() {
    this.pushValue$ = this.pushValue.asObservable();
  }

  increaseValue() {
    this.counter++;
  }
}

describe('take-until-destroyed.component', () => {
  let parentComponent: ParentToTestComponent;
  let fixture: ComponentFixture<ParentToTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParentToTestComponent, ChildToTestComponent]
    });

    fixture = TestBed.createComponent(ParentToTestComponent);
    parentComponent = fixture.componentInstance;
  });

  /*
   * the take-until-destroyed.ts provide a protected attribut
   * that can be used in components that extends it to unsubsribe.
   *
   * To test this take-until-destroyed.ts i had to create 2 components.
   * The child component is calling a method to increment a counter in the parent component.
   * So when we trigger the child observable input the counter is incremented in the parent component.
   * But at some point i hide the child component and we trigger the child observable input but
   * the counter remain at the same value which means the subscribe inside the child component
   * was unsubscribed proprely.
   * Then i show back the child component and i trigger the child observable input which increase
   * the counter again.
   */
  it('should check it doesnt leak', fakeAsync(() => {
    fixture.detectChanges();

    expect(parentComponent.counter).toBe(0);

    fixture.detectChanges();

    parentComponent.pushValue.next();

    expect(parentComponent.counter).toBe(1);

    parentComponent.pushValue.next();

    expect(parentComponent.counter).toBe(2);

    parentComponent.show = false;

    fixture.detectChanges();

    parentComponent.pushValue.next();

    expect(parentComponent.counter).toBe(2);

    parentComponent.show = true;

    fixture.detectChanges();

    parentComponent.pushValue.next();

    expect(parentComponent.counter).toBe(3);
  }));
});
