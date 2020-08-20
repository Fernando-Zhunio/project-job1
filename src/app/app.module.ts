import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import {AngularFireModule} from '@angular/fire';
// import {Angular} from '@angular/fire';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AngularFirestoreModule} from '@angular/fire/firestore'
import {AngularFireModule} from '@angular/fire';
import { PeticionComponent } from './Componentes/peticion/peticion.component';
import { ChatsComponent } from './Componentes/chats/chats.component';
import { ClientComponent } from './Componentes/client/client.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatGridListModule, MatSidenavModule, MatToolbarModule, MatButtonModule, MatCardModule, MatBadgeModule, MatChipsModule, MatIconModule} from '@angular/material';
import { HomeComponent } from './Componentes/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    PeticionComponent,
    ChatsComponent,
    ClientComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    // MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatGridListModule,
    MatToolbarModule,
    MatSidenavModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    // AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
