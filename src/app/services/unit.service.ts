import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  private baseUrl = 'http://localhost:3000/unit'

  constructor(private httpClient: HttpClient) { }

  list(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}`, options)
      .toPromise();
  }

  getUnit(id): Promise<any> {
    const options = {
      withCredentials: true
    }
    return this.httpClient.get(`${this.baseUrl}/${id}`, options)
      .toPromise();
  }

  // getOverview(id): Promise<any> {
  //   const options = {
  //     withCredentials: true
  //   }
  //   return this.httpClient.get(`${this.baseUrl}/${id}/overview`, options)
  //     .toPromise();
  // }
}