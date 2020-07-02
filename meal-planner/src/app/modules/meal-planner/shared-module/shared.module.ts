import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FoodInputComponent } from '../shared-components/food-input/food-input.component';
import { FoodSearchComponent } from '../shared-components/food-search/food-search.component';



@NgModule({
  declarations: [
    FoodInputComponent,
    FoodSearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    FoodInputComponent,
    FoodSearchComponent,
  ]
})
export class SharedModule { }
