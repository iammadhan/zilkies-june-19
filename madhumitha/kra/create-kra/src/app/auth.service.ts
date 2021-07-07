import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
onSubmit:boolean=true;

  constructor() { }

  submit(){
    this.onSubmit=true;
  }

  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.onSubmit);
        }, 200);
      }
    );
    return promise;
  }
}
