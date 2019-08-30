import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class TakeUntilDestroyed implements OnDestroy {
  protected destroyed$: Subject<void> = new Subject<void>();

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
