import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../services/chat.service';
import { AuthService } from 'src/app/services/auth.service';
import { CohortService } from 'src/app/services/cohort.service';

@Component({
    selector: 'my-app',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    providers:[ChatService]
})
export class ChatComponent implements OnInit{

  user: any;
  error = false;
  room:String;
  cohorts: any;
  inputMessage: any;
  messageText:String;
  messageArray:Array<{user:Object, message:String, picture:String}> = [];

  constructor(
    private _chatService:ChatService,
    private authService: AuthService,
    private cohortService: CohortService) {
      this._chatService.newUserJoined()
      .subscribe(data=> this.messageArray.push(data));
      this._chatService.userLeftRoom()
      .subscribe(data => this.messageArray.push(data));
      this._chatService.newMessageReceived()
      .subscribe(data => this.messageArray.push(data));
  }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.room = 'Ironhack Global'
    this.join();
    this._chatService.getMessages()
    .then((results) => {
      this.messageArray = results
      this.cohortService.list()
      .then((results)=>{
        this.cohorts = results;
      })
    })
    .catch((error) => {
      console.log(error);
      this.error = true;
    })
  }

  join() {
    this._chatService.joinRoom({user:this.user.firstName, room:this.room});
  }

  // leave() {
  //   this._chatService.leaveRoom({user:this.user, room:this.room});
  // }

  sendMessage(event) {
    if (event.keyCode == 13 && this.messageText !== undefined) {
      this._chatService.sendMessage({user:this.user, room:this.room, message:this.messageText, picture:this.user.profilePic});
      this._chatService.saveMessage({user:this.user, room:this.room, message:this.messageText, picture:this.user.profilePic})
      this.messageText = null;
    }
  }
}
