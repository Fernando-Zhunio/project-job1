import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
hasId:boolean=false;
constructor(){
  if(!localStorage.getItem('myId'))this.hasId = false
  else this.hasId = true;
}

}
