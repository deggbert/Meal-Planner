import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FoodInputComponent } from '../shared-components/food-input/food-input.component';
import { FoodSearchComponent } from '../shared-components/food-search/food-search.component';

import { SortByPipe } from 'src/app/shared/pipes/sortBy';

@NgModule({
  declarations: [
    FoodInputComponent,
    FoodSearchComponent,

    SortByPipe,
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
    
    SortByPipe,
  ]
})
export class SharedModule { }
