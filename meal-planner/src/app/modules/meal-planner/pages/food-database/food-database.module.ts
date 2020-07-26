import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared-module/shared.module';
import { FoodDatabaseRoutingModule } from './food-database-routing.module';

import { FoodDatabaseComponent } from './page/food-database.page';
import { FoodTableComponent } from './components/food-table/food-table.component';

@NgModule({
  declarations: [
    FoodDatabaseComponent,
    FoodTableComponent
  ],
  imports: [
    SharedModule,
    FoodDatabaseRoutingModule
  ]
})
export class FoodDatabaseModule { }
