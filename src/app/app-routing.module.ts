import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProfileComponent } from './profile/profile.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'' , redirectTo: "profile" , pathMatch:'full' },
  {path: "profile" , canActivate:[AuthGuard] , component:ProfileComponent , title:"Profile"},
  {path: "signin" , component:SigninComponent , title:"Login"},
  {path: "signup" , component:SignupComponent , title:"Register"},
  {path:'**' , component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
