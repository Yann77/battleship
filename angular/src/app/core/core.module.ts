import {ErrorHandlerComponent} from './error-handler/error-handler.component';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

@NgModule({
  declarations: [ErrorHandlerComponent],
  exports: [ErrorHandlerComponent],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
