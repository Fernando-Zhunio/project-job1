import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Observable, Subscription } from "rxjs";
import { Imessage } from "../../interfaces/imessage";
import { groupBy } from "rxjs/operators";
@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.scss"],
})
export class ClientComponent implements OnInit {
  ngOnInit() {
    this.heightGrib = window.innerHeight - 50;
  }
  // @ViewChild('sidebar',{static:true}) sidebar:ElementRef<any>
  heightGrib: number;
  title = "chatfirebase";
  myId: string;
  username: string = "Fernando Zhunio R.";

  peticiones = [
    // {id:'fzhunio91@hotmail.com',categoria:'Videojuego',text:'Necesito un PS4 slim a buen precio'},
    // {id:'fzreyes1991@gmail.com',categoria:'Vestimenta',text:'Necesito Zapatos Adidas talla 42'},
    // {id:'fernandozhunior@ug.edu.ec',categoria:'Videojuego',text:'Necesito un XBOX ONE slim a buen precio'},
  ];

  currentPeticon = null;
  openSideNav = false;
  messages = [];
  // message: string = "";
  // chats: AngularFirestoreCollection<any>;
  chats: any;
  // currentChat: { data: Object; id: string } = { data: { from: "" }, id: "" };
  currentChat: string;
  // newMessage: Imessage;
  itemCollecion: AngularFirestoreCollection<any>;
  // item: Observable<any>;
  peticionId: string;
  keys: {};
  // forId: string;

  constructor(private afs: AngularFirestore) {
    if (!localStorage.getItem("myId")) {
      alert("Usted no cuenta con un id por favor cierre y abra sesión");
    }
    this.myId = localStorage.getItem("myId");
    this.loadPeticiones(this.myId);
  }

  loadPeticiones(peticion) {
    this.itemCollecion = this.afs.collection<any>(`${peticion}_client`);
    this.itemCollecion.snapshotChanges().subscribe((res: any) => {
      console.log(res);
      res.forEach((catData: any) => {
        this.peticiones.push({
          id: catData.payload.doc.id,
          data: catData.payload.doc.data(),
        });
      });
      console.log("peticiones: ", this.peticiones);
    });
  }

  selectPeticion(item) {
    this.peticionId = item.id;
    // this.itemCollecion.doc(item.id).collection('chats').snapshotChanges().subscribe(res=>{
    //   console.log('select petition: ',res);
    //   this.chats=[];
    //   res.forEach((catData: any) => {
    //     let newPush = {
    //       id: catData.payload.doc.id,
    //       data: catData.payload.doc.data()
    //     }
    //     console.log(newPush);
    //     this.chats.push(newPush);
    //   });
    //   this.openSideNav=false;
    // });
    // this.currentPeticon = item.data;
    this.chats = [];
    this.keys=[]
    this.itemCollecion
      .doc(item.id)
      .collection("chats",ref=>ref.orderBy('fecha'))
      .valueChanges()
      .subscribe((res) => {
        console.log("select petition: ", res);
        if (res.length > 0) { 
          console.log(this.groupBy(res));

          this.chats = this.groupBy(res);
          // if (this.chats != null) {
             this.keys = Object.keys(this.chats);
            delete this.keys[this.myId + "_client"];
            console.log(this.keys);
        }
      });
      this.openSideNav = false;
    this.currentPeticon = item.data;
  }

  // messages=[];
  suscribe_message: Subscription;
  selectChat(index) {
    // this.openSideNav = false;
    // this.openSideNav = true;
    // this.sidebar.toggle();
    this.currentChat = index;
  }

  // keys() : Array<string> {
  //   if(this.chats!=null)
  //   {
  //     let key = Object.keys(this.chats);
  //     delete key[this.myId+'_client'];
  //     console.log(key);
  //     return key;
  //   }
  //   return []
  // }
  groupBy(array) {
    let result = array.reduce(function (r, a) {
      r[a.user] = r[a.user] || [];
      r[a.user].push(a);
      return r;
    }, Object.create(null));
    return result;
  }
}
