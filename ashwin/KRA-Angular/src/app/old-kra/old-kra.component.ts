import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../login.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-old-kra',
  templateUrl: './old-kra.component.html',
  styleUrls: ['./old-kra.component.css']
})

export class OldKraComponent implements OnInit {

  @ViewChild(NavBarComponent)
  private navBar: NavBarComponent;


  options: string[] = ['Alex', 'Alan', 'Wayne', 'Tom', 'Robert', 'Ellen', 'Taylor', 'Justin', 'Morgan', 'Albert'];

  names: string[] = ['Alex', 'Alan', 'Wayne', 'Tom', 'Robert', 'Ellen', 'Taylor', 'Justin', 'Morgan', 'Albert'];

  flag = false;

  constructor(private service: LoginService) { }



  setFlag() {
    if (this.flag) {
      this.flag = false;
    } else {
      this.flag = true;
    }
  }

  ngOnInit() {
    this.navBar.setLoggedIn();
  }
}
