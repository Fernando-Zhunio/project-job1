import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeticionComponent } from './Componentes/peticion/peticion.component';
// import { ChatsComponent } from './Componentes/chats/chats.component';
import { ClientComponent } from './Componentes/client/client.component';
import { CreateComponent } from './Componentes/create/create.component';
import { SellerComponent } from './Componentes/seller/seller.component';

const routes: Routes = [
  {path:'', redirectTo:'oferts',pathMatch:'full'},
  {path:'oferts', component:PeticionComponent},
  {path:'client', component:ClientComponent},
  {path:'create', component:CreateComponent},
  {path:'seller', component:SellerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
