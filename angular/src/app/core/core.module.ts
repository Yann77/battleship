import {ErrorHandlerComponent} from './error-handler/error-handler.component';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TakeUntilDestroyed} from './take-until-destroyed/take-until-destroyed';

@NgModule({
  declarations: [ErrorHandlerComponent],
  exports: [ErrorHandlerComponent],
  imports: [
    CommonModule
  ],
  providers: [TakeUntilDestroyed]
})
export class CoreModule { }
