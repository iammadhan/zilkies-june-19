import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PasswordChangedComponent } from './password-changed/password-changed.component';
import { MailBoxComponent } from './mail-box/mail-box.component';
import { KraHomeComponent } from './kra-home/kra-home.component';


const routes: Routes = [
  { path: '', redirectTo:'/forgot-password', pathMatch: 'full'},
  { path: 'forgot-password', component:ForgotPasswordComponent},
  { path: 'set-password', component:SetPasswordComponent},
  { path: 'notifications', component:NotificationsComponent},
  { path: 'password-changed',component:PasswordChangedComponent},
  { path: 'mail-box', component:MailBoxComponent},
  { path: 'home',component:KraHomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
