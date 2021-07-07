import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KraListService {

  constructor() { }

  getKra() {
    let kraList = [
      { value: "read angular" }, { value: "read ionic" }, { value: "read ds" }
    ];

    return kraList;
  }


}


