import { KraListService } from './../kra-list.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-self-gyaan',
  templateUrl: './self-gyaan.component.html',
  styleUrls: ['./self-gyaan.component.css']
})
export class SelfGyaanComponent implements OnInit {
  kraList: any[];
  form: FormGroup;

  ngOnInit() {
  this.kraList = this.service.getKra();
  this.form = this.toFormGroup(this.kraList);
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}

  constructor (private service: KraListService) {

  }


  toFormGroup(kraList) {
    let group: any = {};
    this.kraList.forEach((kra, index) => {
      group[index] = new FormControl('', [Validators.required, this.noWhitespaceValidator]);
    });

    return new FormGroup(group);
  }
}
