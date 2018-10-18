import { Injectable } from "@angular/core";
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';


import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class ChatService{
  private apiUrl = environment.apiUrl
  private socket = io(`${this.apiUrl}`);

  constructor(private httpClient: HttpClient) { }

  joinRoom(data)
  {
    this.socket.emit('join',data);
  }

  newUserJoined()
  {
    let observable = new Observable<{user:Object, message:String, picture:String}>(observer=>{
        this.socket.on('new user joined', (data)=>{
            observer.next(data);
        });
        return () => {this.socket.disconnect();}
    });

    return observable;
  }

    // leaveRoom(data){
    //     this.socket.emit('leave',data);
    // }

    userLeftRoom(){
        let observable = new Observable<{user:String, message:String, picture: String}>(observer=>{
            this.socket.on('left room', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

  sendMessage(data)
  {
    this.socket.emit('message',data);
  }

  newMessageReceived(){
    let observable = new Observable<{user:Object, message:String, picture:String}>(observer=>{
        this.socket.on('new message', (data)=>{
            observer.next(data);
        });
        return () => {this.socket.disconnect();}
    });

    return observable;
  }

  saveMessage(data): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.apiUrl}/chat/create-message`,data, options)
    .toPromise()
}

  getMessages(): Promise<any>{
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.apiUrl}/chat`, options)
    .toPromise()
  }
}
