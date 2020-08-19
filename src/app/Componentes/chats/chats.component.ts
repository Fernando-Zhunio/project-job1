import { Component, OnInit, Input } from '@angular/core';
import { Imessage } from '../../interfaces/imessage';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

 @Input() currentChat;
 @Input() peticionId;
 @Input() messages;
  ngOnInit() {
  }
  constructor(private afs:AngularFirestore){
  } 
  myId='fzhunio91@hotmail.com';
  message:string;
  newMessage:Object;
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
    // this.afs.collection<any>(this.currentMessage.from).doc(this.myId).set(this.newMessage);
    // this.itemCollecion.add(this.newMessage);
  }
}
