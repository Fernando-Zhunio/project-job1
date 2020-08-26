import {
  Component,
  OnInit,
  Input,
  ViewChildren,
  QueryList,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Imessage } from "../../interfaces/imessage";
import { AngularFirestore } from "@angular/fire/firestore";
import { Subscription } from "rxjs";

@Component({
  selector: "app-chats",
  templateUrl: "./chats.component.html",
  styleUrls: ["./chats.component.scss"],
})
export class ChatsComponent implements OnInit {
  @Input() currentChat;
  @Input() peticionId;
  // @Input() peticionId;
  @Input() messages;
  @Input() isMy;
  @ViewChildren("messages") things: QueryList<any>;
  @ViewChild("chatbody",{ static: true }) chatBody: ElementRef;
  chatSuscription: Subscription;
  @Input() forId:string
  // isMy
  message: string;
  newMessage: Object;
  btnIsValid = false;

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    // if(!localStorage.getItem('myId')){
    //   alert('NO posee una identificador por favor cierre y abra sesión');
    //   return;
    // }
    // this.myId = localStorage.getItem('myId')+'_client';
  }

  ngAfterViewInit(): void {
    this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
      this.chatSuscription = this.things.changes.subscribe((t) => {
        this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
        console.log("chat abierto");
      });
  }

  ngOnDestroy(): void {
    // if(!this.chatSuscription.closed)
    // this.chatSuscription.unsubscribe();
  }

  sendMessage() {
    console.log("enviando");
    let newMessage = {
      // from: this.myId+'_client',
      user: this.messages[0].user,
      // type: "string",
      message: this.message,
      fecha: new Date().getTime(),
      isMy:this.isMy
    };
    console.log(newMessage);

    this.afs
      .collection<any>(this.forId)
      .doc(this.peticionId)
      .collection("chats")
      // .doc(this.currentChat.id)
      // .collection("messages")
      .add(newMessage)
      .then((res) => console.log("res ", res))
      .catch((err) => console.log(err));
      console.log(this.currentChat);
      this.message = "";
    // this.afs
    //   .collection<any>(`${this.currentChat.data.from}seller`)
    //   .doc(this.peticionId)
    //   .collection("chats")
    //   .doc(this.currentChat.id)
    //   .collection("messages")
    //   .add(newMessage)
    //   .then((res) => console.log("res ", res))
    //   .catch((err) => console.log(err));
  }

  keyUpSms(): void {
    // this.serviceSocket.emit('clientesWrite',true);
    if (this.message != null && this.message.trim() != "") {
      this.btnIsValid = true;
    } else this.btnIsValid = false;
  }
}
