import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { MailBoxComponent } from './mail-box/mail-box.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordChangedComponent } from './password-changed/password-changed.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { KraHomeComponent } from './kra-home/kra-home.component';
import { NotificationsComponent } from './notifications/notifications.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    MailBoxComponent,
    ForgotPasswordComponent,
    PasswordChangedComponent,
    SetPasswordComponent,
    KraHomeComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
