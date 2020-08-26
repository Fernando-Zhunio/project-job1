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
import {MatGridListModule,
   MatSidenavModule,
   MatToolbarModule,
   MatButtonModule,
   MatCardModule,
   MatChipsModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatMenuModule, MatDialogModule, MatListModule} from '@angular/material';
import { HomeComponent } from './Componentes/home/home.component';
// import {AutosizeModule} from 'ngx-autosize';
import {TextFieldModule} from '@angular/cdk/text-field';
import { SellerComponent } from './Componentes/seller/seller.component';
import { CreateComponent } from './Componentes/create/create.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ModalPeticionComponent } from './Componentes/Modals/modal-peticion/modal-peticion.component';
// import {ScrollableModule} from '@angular/cdk/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
// import { FlexLayoutModule } from "@angular/flex-layout";
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    PeticionComponent,
    ChatsComponent,
    ClientComponent,
    HomeComponent,
    SellerComponent,
    CreateComponent,
    ModalPeticionComponent,
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    
    MatButtonModule,
    MatCardModule,
    ScrollingModule,
    // MatBadgeModule,
    TextFieldModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatChipsModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatGridListModule,
    MatToolbarModule,
    MatSidenavModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    // AutosizeModule
    // AngularFireDatabaseModule,
  ],
  entryComponents:[ModalPeticionComponent],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
