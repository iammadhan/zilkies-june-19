import { Component, OnInit } from '@angular/core';
import { Constants } from '../constants/Constants';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {

  passwordPattern = Constants.getPasswordPattern();
  newPassword: string;

  constructor() { }

  ngOnInit() {
  }

}
