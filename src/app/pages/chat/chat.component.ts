import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../services/chat.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'my-app',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    providers:[ChatService]
})
export class ChatComponent implements OnInit{

    user: any;
    room:String;
    messageText:String;
    messageArray:Array<{user:Object, message:String, picture:String}> = [];

    constructor(
      private _chatService:ChatService,
      private authService: AuthService)
      {
        this._chatService.newUserJoined()
        // .subscribe(data=> this.messageArray.push(data));
        // this._chatService.userLeftRoom()
        .subscribe(data => this.messageArray.push(data));
        this._chatService.newMessageReceived()
        .subscribe(data => this.messageArray.push(data));
    }

    ngOnInit() {
      this.user = this.authService.getUser();
      this.room = 'Global'
      this.join();
      this._chatService.getMessages()
      .then((results) => {
        this.messageArray = results
      })
    }

    join() {
        this._chatService.joinRoom({user:this.user.firstName, room:this.room});
    }
    // leave() {
    //     this._chatService.leaveRoom({user:this.user, room:this.room});
    // }

    sendMessage() {
        this._chatService.sendMessage({user:this.user, room:this.room, message:this.messageText, picture:this.user.profilePic});
        this._chatService.saveMessage({user:this.user, room:this.room, message:this.messageText, picture:this.user.profilePic})
    }

}
