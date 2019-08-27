import { SocketClientService } from '../socket-client.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private socketClient: SocketClientService) { }

  onError(): Observable<string> {
    return this.socketClient.onPlainMessage('/user/topic/error');
  }
}
