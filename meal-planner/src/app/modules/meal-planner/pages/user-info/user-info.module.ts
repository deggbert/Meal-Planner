import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared-module/shared.module';
import { UserInfoRoutingModule } from './user-info-routing.module';

import { UserInfoComponent } from './page/user-info.component';


@NgModule({
  declarations: [
    UserInfoComponent
  ],
  imports: [
    SharedModule,
    UserInfoRoutingModule
  ]
})
export class UserInfoModule { }
