import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chatfirebase';

  username:string = 'Fernando Zhunio R.'
  mensajes:{isMy:boolean,type:'string'|'File',content:any,date?:Date}[]=[
    {isMy:false,type:'string',content:'Mensaje de prueba'},
    {isMy:true,type:'string',content:'Mensaje de prueba'},
    {isMy:false,type:'string',content:'Mensaje de prueba'},
    {isMy:true,type:'string',content:'Mensaje de prueba'},
    {isMy:true,type:'string',content:'Mensaje de prueba'},
    {isMy:true,type:'string',content:'Mensaje de prueba'},
    {isMy:true,type:'string',content:'Mensaje de prueba'},
    {isMy:true,type:'string',content:'Mensaje de prueba'},
    {isMy:true,type:'string',content:'Mensaje de prueba'},
    {isMy:false,type:'string',content:'Mensaje de prueba'},
    {isMy:false,type:'string',content:'Mensaje de prueba'},
    {isMy:false,type:'string',content:'Mensaje de prueba'},
    {isMy:false,type:'string',content:'Mensaje de prueba'},
    {isMy:true,type:'string',content:'Mensaje de prueba'},
    {isMy:false,type:'string',content:'Mensaje de prueba'},
    {isMy:false,type:'string',content:'Mensaje de prueba'},
    {isMy:false,type:'string',content:'Mensaje de prueba'},
    {isMy:true,type:'string',content:'Mensaje de prueba'},
    {isMy:false,type:'string',content:'Mensaje de prueba'},
    {isMy:false,type:'string',content:'Mensaje de prueba'},
    {isMy:false,type:'string',content:'Mensaje de prueba'},
    {isMy:false,type:'string',content:'Mensaje de prueba'},
  ]
}
