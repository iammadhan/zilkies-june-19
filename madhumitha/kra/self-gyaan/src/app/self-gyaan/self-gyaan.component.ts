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
  this.form = this.toFormGroup(this.kraList);
  }

  constructor(service: KraListService) {
    this.kraList = service.getKra();
    this.toFormGroup(this.kraList);

  }
  toFormGroup(kraList) {
    let group: any = {};
    this.kraList.forEach((kra, index) => {
      group[index] = new FormControl('', Validators.required);
    });

    return new FormGroup(group);
  }
}
