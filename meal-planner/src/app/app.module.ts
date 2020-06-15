import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { CoreModule } from './core/core.module';
import { LoginModule } from './modules/login/login.module';
import { MealPlannerModule } from './modules/meal-planner/meal-planner.module';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
      
    CoreModule,
    LoginModule,
    MealPlannerModule,
    
    AppRoutingModule,
    ],
    providers: [
      //allows access to firestore emulator during local testing
      { provide: SETTINGS, useValue: environment.production ? undefined: {
      host: 'localhost:8080',
      ssl: false,
    }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
