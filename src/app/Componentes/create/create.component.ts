import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(private afs:AngularFirestore) { }

  formPedido = new FormGroup({
    pedido:new FormControl(null,[Validators.required]),
    precio:new FormControl(null,[Validators.required]),
    categoria:new FormControl(null,[Validators.required]),
  })
  collection_pedidos = "Pedidos";
  isSend:boolean=false;

  ngOnInit() {
  }

  categorias=[
    {value:'Videojuegos',icon:'sports_esports'},
    {value:'Vestimenta',icon:'accessibility'},
    {value:'Comida',icon:'restaurant'},
    {value:'PC y Laptops',icon:'computer'},
    {value:'Celulares',icon:'stay_current_portrait'},
    {value:'Otros',icon:'devices_other'},
  ];

  enviarPedido(){
    this.isSend = true;
    if(this.formPedido.valid){
    if(!localStorage.getItem('myId')){
      alert('Su usuario esta mal cargado recarge la pagina');
      this.isSend = false;
      return;
    }
     let id = localStorage.getItem('myId');
     let indexCategoria = this.formPedido.controls['categoria'].value;
    // datos del pedido a enviar
    let pedido = {
      categoria: this.categorias[indexCategoria].value,
      icon:this.categorias[indexCategoria].icon,
      descripcion:this.formPedido.controls['pedido'].value,
      fecha: new Date().getTime(),
      precio:this.formPedido.controls['precio'].value,
    }
    // -------------------
    console.log(pedido);
    this.afs.collection(`${id}_client`).add(pedido).then(res=>{
      console.log(res);
      this.formPedido.reset();
      // guardar en la base junto con este pedido la id
      // por el momento lo voy a guardar en firebase
      let url ={
        from : id,
      id_pedido : res.id}
      this.afs.collection(this.collection_pedidos).add({pedido,url,fecha:new Date().getTime()}).then(res=>{
        alert('pedido guardado correctamente');
        this.isSend = false;
      }).catch(err=>{
        console.log(err);
        this.isSend = false;
      })
      console.log({id});
    }).catch(err=>{
      alert('UP! a ocurrido un error intentalo nuevamente');
    })
   }
   else{
     alert('No a llenado correctamente');
   }
  }
}
