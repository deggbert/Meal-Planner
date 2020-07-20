import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared-module/shared.module';

import { PantryRoutingModule } from './pantry-routing.module';

import { PantryComponent } from './page/pantry.component';
import { PantryTableComponent } from './components/pantry-table/pantry-table.component';


@NgModule({
  declarations: [
    PantryComponent, 
    PantryTableComponent
  ],
  imports: [
    SharedModule,
    PantryRoutingModule
  ]
})
export class PantryModule { }
