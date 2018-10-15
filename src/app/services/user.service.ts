import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl + '/users';

  constructor(private httpClient: HttpClient) { }

  find(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.apiUrl}`, options)
      .toPromise();
      
  }

  userCreate(user: any): Promise<any> {
    const options = {
      withCredentials: true,
    };
    return this.httpClient.post(`${this.apiUrl}/user-create`, user, options)
      .toPromise()
  }

  // getOne(id): Promise<any> {
  //   const options = {
  //     withCredentials: true
  //   }
  //   return this.httpClient.get(`${this.apiUrl}/${id}`, options)
  //     .toPromise();
  // }
}
