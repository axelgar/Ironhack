import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {

  private baseUrl = 'http://localhost:3000/curriculum'

  constructor(private httpClient: HttpClient) { }

  list(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}`, options)
      .toPromise();
  }

  getOne(id): Promise<any> {
    const options = {
      withCredentials: true
    }
    return this.httpClient.get(`${this.baseUrl}/${id}`, options)
      .toPromise();
  }
}
