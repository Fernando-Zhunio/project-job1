import { Component, OnInit, Input, ViewChildren, QueryList, ViewChild, ElementRef } from '@angular/core';
import { Imessage } from '../../interfaces/imessage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

 @Input() currentChat;
 @Input() peticionId;
 @Input() messages;
 @Input() heightGrib;
 @ViewChildren('messages') things: QueryList<any>;
 @ViewChild('chatbody',{static:true}) chatBody : ElementRef;
 chatSuscription:Subscription;
 myId='fzhunio91@hotmail.com';
 message:string;
 newMessage:Object;
 
 constructor(private afs:AngularFirestore){}

  ngOnInit() {
    setTimeout(() => {
      this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
      this.chatSuscription = this.things.changes.subscribe(t => {
         this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
         console.log('chat abierto'); 
       });
    }, 4000);
  }

  ngOnDestroy(): void {
    this.chatSuscription.unsubscribe();
  }


  sendMessage() {
    console.log('enviando');
    let newMessage = {
      from: this.myId,
      type: "string",
      content: this.message,
      date: new Date().getTime(),
    };
    console.log(newMessage);
    this.afs
      .collection<any>(this.myId)
      .doc(this.peticionId).collection('chats')
      .doc(this.currentChat.id).collection('messages').add(newMessage)
      .then(res=>console.log('res ',res)).catch(err=>console.log(err));
  }
}
