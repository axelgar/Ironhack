import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { SortableItem } from '../interfaces/sortable-item';
import { environment } from '../../environments/environment';
import { Unit } from '../models/unit';
import { Day } from '../models/day';
import { UnitService } from './unit.service';

@Injectable({
  providedIn: 'root'
})
export class CohortService {
  cohort: any;
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
   * Re-arrange a sortable array by position and title
   * @params items: Array<SortableItem> - The array to sort
   * @returns items: Array<SortableItem> - The sorted array
   */
  private sortItems(items: Array<SortableItem>): Array<SortableItem> {
    return _.orderBy(items, ['position', 'title']);
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
    const self = this;
    const tranferUnits = function (_el) {
      if (sourceDay === targetDay) {
        const subscription = self.unitService.edit(_el).subscribe(
          (res) => console.log('Card position updated', res),
          (err) => console.log('Update card error', err)
        );
      } else {
        const subscription = self.unitService.transfer(_el, sourceDay, targetDay).subscribe(
          (res) => console.log('Card position updated', res),
          (err) => console.log('Update card error', err)
        );
      }
    }

    let tDay = _.find(this.cohort.days, { _id: targetDay }) as Day;
    if (tDay){
      const sDay = _.find(this.cohort.days, { _id: sourceDay }) as Day;
      const _el = _.find(tDay.units, { _id: unitId }) as Unit;
      tranferUnits(_el)
    } else {
      const sDay = _.find(this.cohort.days, { _id: sourceDay }) as Day;
      // let tDay = _.find(this.cohort, { _id: targetDay }) as Cohort;
      const _el = _.find(this.cohort.parkingLot, { _id: unitId }) as Unit;
      tranferUnits(_el)
    }
    // const _index = _.findIndex(tDay.units, { _id: unitId }) as number;
    // _el.position = this.getNewPosition();

    // if (_index !== -1) {
    //   if (_index === 0) {
    //     if (tDay.units.length > 1) {
    //       _el.position = tDay.units[1].position - 1000;
    //     } else {
    //       _el.position = 0;
    //     }
    //   } else {
    //     if (tDay.units[_index - 1] && tDay.units[_index + 1]) {
    //       _el.position = (tDay.units[_index - 1].position + tDay.units[_index + 1].position) / 2;
    //     } else {
    //       _el.position = tDay.units[_index - 1].position + 1000;
    //     }
    //   }

      // Update with the latest day id
      // _el.setDay(tDay._id);
    
    }

    // tDay.units = this.sortItems(tDay.units) as Unit[];
    
}

