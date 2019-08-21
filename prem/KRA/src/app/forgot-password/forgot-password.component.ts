import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegexConstants } from '../regex-constants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {

  mailPattern = RegexConstants.getMailPattern();
  
  constructor() { }

  ngOnInit() {  
  }
  
}
