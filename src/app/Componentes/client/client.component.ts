import { Component, OnInit } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Imessage } from "../../interfaces/imessage";
@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.scss"],
})
export class ClientComponent implements OnInit {
  ngOnInit() {
    // this.myId = localStorage.getItem('myId');
    // this.itemCollecion = this.afs.collection<any>(this.myId);
    // this.loadMessages(this.myId);
  }
  title = "chatfirebase";
  myId: string="fzhunio91@hotmail.com";
  username: string = "Fernando Zhunio R.";
  peticiones = [
    // {id:'fzhunio91@hotmail.com',categoria:'Videojuego',text:'Necesito un PS4 slim a buen precio'},
    // {id:'fzreyes1991@gmail.com',categoria:'Vestimenta',text:'Necesito Zapatos Adidas talla 42'},
    // {id:'fernandozhunior@ug.edu.ec',categoria:'Videojuego',text:'Necesito un XBOX ONE slim a buen precio'},
  ];

  currentPeticon = null;
  // mensajes:{isMy:boolean,type:'string'|'File',content:any,date?:Date}[]=[
  //   {isMy:false,type:'string',content:'Mensaje de prueba'},
  //   {isMy:true,type:'string',content:'Mensaje de prueba'},
  //   {isMy:false,type:'string',content:'Mensaje de prueba'},
  //   {isMy:true,type:'string',content:'Mensaje de prueba'},
  //   {isMy:true,type:'string',content:'Mensaje de prueba'},
  // ];
  messages=[];
  message: string = "";
  // chats: AngularFirestoreCollection<any>;
  chats:any[]=[];
  currentChat: { from: string; id:string } = null;
  newMessage: Imessage;
  itemCollecion: AngularFirestoreCollection<any>;
  item: Observable<any>;
  // myId:string;
  forId: string;
  constructor(private afs: AngularFirestore) {
    this.loadMessages("fzhunio91@hotmail.com");
  }

  loadMessages(peticion) {
    this.itemCollecion = this.afs.collection<any>(peticion);
    this.itemCollecion.snapshotChanges().subscribe((res: any) => {
      console.log(res);
      res.forEach((catData: any) => {
        this.peticiones.push({
          id: catData.payload.doc.id,
          data: catData.payload.doc.data(),
        });
      });
      console.log('peticiones: ',this.peticiones);
      
      // this.chats= res;
      // this.peticiones = res
      //  console.log(this.messages);
    });
  }

  peticionId:string;
  selectPeticion(item) {
    this.peticionId = item.id;
    this.itemCollecion.doc(item.id).collection('chats').snapshotChanges().subscribe(res=>{
      console.log('select petition: ',res);
      this.chats=[];
      // let preChats = [];
      res.forEach((catData: any) => {
        let newPush = {
          id: catData.payload.doc.id,
          data: catData.payload.doc.data()
        }
        console.log(newPush);
        this.chats.push(newPush);
      });
      // console.log('chats :',this.chats); 
    });
    this.currentPeticon = item.data;
  }
  // messages=[];
  selectChat(index) {
    this.currentChat = this.chats[index];
    this.afs
    .collection<any>(this.myId)
    .doc(this.peticionId).collection('chats')
    .doc(this.currentChat.id).collection('messages').valueChanges().subscribe(res=>{
      console.log('messages: ',res);
      this.messages = res;
    })
    // this.path.chatId = this.currentChat.messages.id
  }
}
