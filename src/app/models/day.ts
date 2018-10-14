import * as _ from 'lodash';

import { SortableItem } from '../interfaces/sortable-item';
import { Unit } from './unit';

export class Day implements SortableItem {
    _id: string;
    title: string;
    position: number;
    units: Array<Unit> = [];
    morning: Array<Unit> = [];
    midday: Array<Unit> = [];
    evening: Array<Unit> = [];

    constructor ({
        _id, title, position, morning
    }) {
        this._id = _id;
        this.title = title;
        this.position = position;
        this.morning = morning.map((unit) => new Unit(unit));
    }

    update(day) {
        this.title = day.title;
        this.position = day.position;
    }

    addUnit(unit: Unit): Array<Unit> {
        this.units.push(unit);
        this.sortUnits();
        return this.units;
    }

    private sortUnits() {
        this.units = _.orderBy(this.units, ['position', 'title']);
        return this.units;
    }
}

