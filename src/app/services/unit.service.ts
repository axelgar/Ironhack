import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Unit } from '../models/unit';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  private apiUrl = environment.apiUrl + '/unit';

  constructor(private httpClient: HttpClient) { }

  list(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.apiUrl}`, options)
      .toPromise();
  }

  getUnit(id): Promise<any> {
    const options = {
      withCredentials: true
    }
    return this.httpClient.get(`${this.apiUrl}/${id}`, options)
      .toPromise();
  }

  /**
   * Edit an existing card
   * @param unit: Card
   * @returns Observable<Card>
   */
  edit(unit: Unit) {
    return this.httpClient.put(`${this.apiUrl}/${unit._id}`, unit)
      .pipe(map((_card) => {
        unit = new Unit(_card);
        return unit;
      }))
      .pipe(catchError((err) => Observable.throw(err.json())));
  }

  /**
   * Edit an existing card
   * @param unit: Card
   * @param from: string - The source list's id
   * @param to: string - The destinantion list's id
   * @returns Observable<Card>
   */
  transfer(unit: Unit, from, to) {
    const body = {
      unit,
      from,
      to
    };
    return this.httpClient.put(`${this.apiUrl}/transfer/${unit._id}`, body)
      .pipe(catchError((err) => Observable.throw(err.json())));
  }
}