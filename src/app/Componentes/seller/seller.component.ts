import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-seller",
  templateUrl: "./seller.component.html",
  styleUrls: ["./seller.component.scss"],
})
export class SellerComponent implements OnInit {
  heightGrib: number;
  openSideNav:boolean= false;
  currentChat: any;
  chats = [];
  clients = [];
  peticionId:any;
  myId: string;
  constructor(private afs: AngularFirestore) {
    this.myId = localStorage.getItem('myId')+"_client";
    afs
      .collection(this.myId)
      .doc("Client")
      .collection("clients")
      .valueChanges()
      .subscribe((res) => {
        console.log(res);
        
        this.clients = res;
      });
  }

  ngOnInit() {
    this.heightGrib = window.innerHeight - 50;
  }

  selectChat(item) {
    console.log(item);
    this.peticionId = item;    
    this.afs
      .collection(item.to)
      .doc(item.peticion_id)
      .collection("chats",
      // , 
      ref =>ref.orderBy('fecha').where("user", "==", this.myId)
      )
      .valueChanges()
      .subscribe(res=>{
        console.log(res);
        this.chats = res
        if(res.length >0)
        {
          this.openSideNav = true;

        }
      })
  }
}
