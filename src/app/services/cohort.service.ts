import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import * as _ from 'lodash';
import { Subject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


import { SortableItem } from '../interfaces/sortable-item';
// import { GenericResponse } from '../interfaces/generic-response';
import { environment } from '../../environments/environment';
import { Unit } from '../models/unit';
import { Day } from '../models/day';
import { UnitService } from './unit.service';

@Injectable({
  providedIn: 'root'
})
export class CohortService {
  cohort: any;
  days: Array<SortableItem> = [];
  private apiUrl = environment.apiUrl + '/cohort';

  constructor(private httpClient: HttpClient,  private unitService: UnitService) { }

  list(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.apiUrl}`, options)
      .toPromise();
  }

  getCohort(id): Observable<any> {
    const options = {
      withCredentials: true
    }
    return this.httpClient.get(`${this.apiUrl}/${id}`, options)
    .pipe(map((res) => {
      return this.cohort = res;
    }))
    .pipe(catchError((err) => Observable.throw(err.json())));
  }

  getCalendar(id): Promise<any> {
    const options = {
      withCredentials: true
    }
    return this.httpClient.get(`${this.apiUrl}/${id}/calendar`, options)
      .toPromise();
  }

  getOverview(id): Promise<any> {
    const options = {
      withCredentials: true
    }
    return this.httpClient.get(`${this.apiUrl}/${id}/overview`, options)
      .toPromise();
  }

  create(data): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.apiUrl}/create`, data, options)
      .toPromise();
  }
  
/**
   * Edit a cohort
   * @params cohort: SortableItem
   * @returns Observable<GenericResponse>
   */
  editAdd(cohort: SortableItem){
    return this.httpClient.put(`${this.apiUrl}/${cohort._id}/add`, cohort)
      .pipe(catchError((err) => Observable.throw(err.json())));
  }

  /**
   * Edit a cohort
   * @params cohort: SortableItem
   * @returns Observable<GenericResponse>
   */
  editRemove(cohort: SortableItem){
    return this.httpClient.put(`${this.apiUrl}/${cohort._id}/remove`, cohort)
      .pipe(catchError((err) => Observable.throw(err.json())));
  }


  shiftUnit(sourceDay, targetDay, unitId): void {
    const sDay = _.find(this.cohort.days, { _id: sourceDay }) as Day;
    const tDay = _.find(this.cohort.days, { _id: targetDay }) as Day;
    const _index = _.findIndex(tDay.morning, { _id: unitId }) as number;
    const _el = _.find(tDay.morning, { _id: unitId }) as Unit;

    if (_index !== -1) {
      if (_index === 0) {
        if (tDay.morning.length > 1) {
          _el.position = tDay.morning[1].position - 1000;
        } else {
          _el.position = 0;
        }
      } else {
        if (tDay.morning[_index - 1] && tDay.morning[_index + 1]) {
          _el.position = (tDay.morning[_index - 1].position + tDay.morning[_index + 1].position) / 2;
        } else {
          _el.position = tDay.morning[_index - 1].position + 1000;
        }
      }

      // Update with the latest day id
      // _el.setDay(tDay._id);

      if (sourceDay === targetDay) {
        const subscription = this.unitService.edit(_el).subscribe(
          (res) => console.log('Card position updated', res),
          (err) => console.log('Update card error', err)
        );
      } else {
        const subscription = this.unitService.transfer(_el, sourceDay, targetDay).subscribe(
          (res) => console.log('Card position updated', res),
          (err) => console.log('Update card error', err)
        );
      }
    }

    // tDay.units = this.sortItems(tDay.units) as Unit[];
  }


}