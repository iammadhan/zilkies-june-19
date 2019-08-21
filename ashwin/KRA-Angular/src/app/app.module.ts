import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { OldKraComponent } from './old-kra/old-kra.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SetPasswordComponent } from './set-password/set-password.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FilterPipe} from './filter.pipe';

import { MatInputModule } from '@angular/material';
import { MatSortModule } from '@angular/material/sort';

import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CustomDropdownComponent } from './custom-dropdown/custom-dropdown.component';
import { DropdownComponent } from './custom-dropdown/dropdown.component';
import { CustomSelectComponent } from './old-kra/custom-select';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    LoginComponent,
    OldKraComponent,
    SetPasswordComponent,
    FilterPipe,
    CustomDropdownComponent,
    DropdownComponent,
    CustomSelectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatInputModule,
    OverlayModule,
    PortalModule,
    TranslateModule.forRoot({
      loader: {
         provide: TranslateLoader,
         useFactory: httpLoaderFactory,
         deps: [HttpClient]
      }
   }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}
