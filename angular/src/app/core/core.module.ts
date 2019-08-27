import {ErrorHandlerComponent} from './error-handler/error-handler.component';
import {SocketClientService} from './socket-client.service';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

@NgModule({
  declarations: [ErrorHandlerComponent],
  exports: [ErrorHandlerComponent],
  imports: [
    CommonModule
  ],
  providers: [SocketClientService]
})
export class CoreModule { }
