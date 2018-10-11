import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CohortService {

  private baseUrl = 'http://localhost:3000/cohort'

  constructor(private httpClient: HttpClient) { }

  list(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.baseUrl}`, options)
      .toPromise();
  }

  getCohort(id): Promise<any> {
    const options = {
      withCredentials: true
    }
    return this.httpClient.get(`${this.baseUrl}/${id}`, options)
      .toPromise();
  }

  getCalendar(id): Promise<any> {
    const options = {
      withCredentials: true
    }
    return this.httpClient.get(`${this.baseUrl}/${id}/calendar`, options)
      .toPromise();
  }

  getOverview(id): Promise<any> {
    const options = {
      withCredentials: true
    }
    return this.httpClient.get(`${this.baseUrl}/${id}/overview`, options)
      .toPromise();
  }

  create(data): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.baseUrl}`, data, options)
      .toPromise();
  }


}