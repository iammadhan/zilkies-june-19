import {
  Injectable
} from '@angular/core';
import {
  Observable,
  BehaviorSubject
} from 'rxjs';
import {
  HttpClient
} from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  getNames(): Observable <any> {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  // showNames(): void {
  //   this.http.get('https://jsonplaceholder.typicode.com/users')
  //   .subscribe((val) => {
  //     val.forEach(items => {
  //       items.filter
  //     });
  //   });
  // }

}
