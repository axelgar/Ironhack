import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { SortableItem } from '../interfaces/sortable-item';
import { Day } from '../models/day';
import { Unit } from '../models/unit';
import { UnitService } from './unit.service';

@Injectable({
  providedIn: 'root'
})
export class DaysService {
  days: Array<SortableItem> = [];

  constructor(
    private unitService: UnitService,
  ) { }

    /**
   * Re-arrange a sortable array by position and title
   * @params items: Array<SortableItem> - The array to sort
   * @returns items: Array<SortableItem> - The sorted array
   */
  private sortItems(items: Array<SortableItem>): Array<SortableItem> {
    return _.orderBy(items, ['position', 'title']);
  }

  shiftCard(sourceDay, targetDay, cardId): void {
    const sDay = _.find(this.days, { _id: sourceDay }) as Day;
    const tDay = _.find(this.days, { _id: targetDay }) as Day;
    const _index = _.findIndex(tDay.units, { _id: cardId }) as number;
    const _el = _.find(tDay.units, { _id: cardId }) as Unit;

    if (_index !== -1) {
      if (_index === 0) {
        if (tDay.units.length > 1) {
          _el.position = tDay.units[1].position - 1000;
        } else {
          _el.position = 0;
        }
      } else {
        if (tDay.units[_index - 1] && tDay.units[_index + 1]) {
          _el.position = (tDay.units[_index - 1].position + tDay.units[_index + 1].position) / 2;
        } else {
          _el.position = tDay.units[_index - 1].position + 1000;
        }
      }

      // Update with the latest day id
      _el.setDay(tDay._id);

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

    tDay.units = this.sortItems(tDay.units) as Unit[];
  }
}
