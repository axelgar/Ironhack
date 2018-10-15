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

  getOne(id): Promise<any> {
    const options = {
      withCredentials: true
    }
    return this.httpClient.get(`${this.apiUrl}/${id}`, options)
      .toPromise()
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

  create(data): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.apiUrl}/create`, data, options)
      .toPromise();
  }

  // private getNextPosition(): number {
  //   if (this.days.length !== 0) {
  //     const pos = _.last(this.days).position;
  //     return pos + 1000;
  //   } else {
  //     return 0;
  //   }
  // }
   /**
   * Re-arrange a sortable array by position and title
   * @params items: Array<SortableItem> - The array to sort
   * @returns items: Array<SortableItem> - The sorted array
   */
  private sortItems(items: Array<SortableItem>): Array<SortableItem> {
    return _.orderBy(items, ['position', 'title']);
  }

  shiftUnit(sourceDay, targetDay, unitId): void {
    const self = this;
    let tDay = _.find(this.cohort.days, { _id: targetDay }) as Day;
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

    // const updatePosition = function (_el) {
    //   const _index = _.findIndex(tDay.units, { _id: unitId }) as number;
    //   if (_index !== -1) {
    //     if (_index === 0) {
    //       if (tDay.units.length > 1) {
    //         _el.position = tDay.units[1].position - 1000;
    //       } else {
    //         _el.position = 0;
    //       }
    //     } else {
    //       if (tDay.units[_index - 1] && tDay.units[_index + 1]) {
    //         _el.position = (tDay.units[_index - 1].position + tDay.units[_index + 1].position) / 2;
    //       } else {
    //         _el.position = tDay.units[_index - 1].position + 1000;
    //       }
    //     }
    //   }
    // }

    if (tDay){
      const sDay = _.find(this.cohort.days, { _id: sourceDay }) as Day;
      const _el = _.find(tDay.units, { _id: unitId }) as Unit;
      tranferUnits(_el)
      // updatePosition(_el)
    } else {
      const sDay = _.find(this.cohort.days, { _id: sourceDay }) as Day;
      const _el = _.find(this.cohort.parkingLot, { _id: unitId }) as Unit;
      tranferUnits(_el)
      // updatePosition(_el)
    }
      // Update with the latest day id
      // _el.setDay(tDay._id); 
      // tDay.units = this.sortItems(tDay.units) as Unit[];
    }

    
}

