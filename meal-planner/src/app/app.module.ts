import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodDatabaseComponent } from './food-database/food-database.component';
import { FoodInputComponent } from './food-input/food-input.component';
import { MessagesComponent } from './messages/messages.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { MealPrepComponent } from './meal-prep/meal-prep.component';
import { DailyMealPlanComponent } from './daily-meal-plan/daily-meal-plan.component';
import { FoodStockComponent } from './food-stock/food-stock.component';
import { GroceryTripComponent } from './grocery-trip/grocery-trip.component';
import { FoodSearchComponent } from './food-search/food-search.component';
import { FoodEditComponent } from './food-edit/food-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    FoodDatabaseComponent,
    FoodInputComponent,
    MessagesComponent,
    UserInfoComponent,
    MealPrepComponent,
    DailyMealPlanComponent,
    FoodStockComponent,
    GroceryTripComponent,
    FoodSearchComponent,
    FoodEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
