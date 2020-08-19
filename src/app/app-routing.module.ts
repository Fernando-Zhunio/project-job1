import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeticionComponent } from './Componentes/peticion/peticion.component';
import { ChatsComponent } from './Componentes/chats/chats.component';
import { ClientComponent } from './Componentes/client/client.component';

const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch:'full'},
  {path:'home', component:PeticionComponent},
  {path:'client', component:ClientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
