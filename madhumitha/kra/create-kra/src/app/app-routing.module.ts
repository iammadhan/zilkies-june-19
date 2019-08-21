import { CreateKraComponent } from './create-kra/create-kra.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
 /* { path: '', redirectTo: '/create-kra', pathMatch: 'full' },
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {
    path: 'create-kra',
    component: CreateKraComponent}
*/

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
