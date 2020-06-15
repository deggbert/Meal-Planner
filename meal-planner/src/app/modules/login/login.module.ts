import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';

import { LoginComponent } from './pages/login/login.component';
import { GoogleLoginComponent } from './components/google-login/google-login.component';


@NgModule({
  declarations: [LoginComponent, GoogleLoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
