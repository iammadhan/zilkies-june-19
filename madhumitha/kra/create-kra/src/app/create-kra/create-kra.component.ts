import { AuthService } from './../auth.service';
import { TranslateService } from '@ngx-translate/core';

import { KraRowComponent } from './kra-row/kra-row.component';
import { Component, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { kra } from './kra';


@Component({
  selector: 'app-create-kra',
  templateUrl: './create-kra.component.html',
  styleUrls: ['./create-kra.component.css']
})
export class CreateKraComponent implements AfterViewInit {

  count: any = 1;
  index: any;
  newLength: any;
  kra: string[] = [];
  kraValue: string;
  kraRow = [new kra('')];
  errorMessage: boolean = false;

  constructor() {
  }
  ngAfterViewInit() {
  }

  addNewRow() {
    this.count++;
    //this.kraRow.push({ 'value': '' });
    this.kraRow.push(new kra(''));
    console.log(this.kraRow);
  }

  receiveNumber($event) {
    this.index = $event;
    this.kraRow.splice(this.index - 1, 1);
  }
  onSave() {
    this.errorMessage = false;
    for (var i of this.kraRow) {
      if (i.value == '') {
        this.errorMessage = true;
      }
    }
  }

  onSubmit() {
    this.errorMessage = false;
    for (var i of this.kraRow) {
      if (i.value == '')
        this.errorMessage = true;

    }
  }
}



