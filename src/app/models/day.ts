import * as _ from 'lodash';

import { SortableItem } from '../interfaces/sortable-item';
import { Unit } from './unit';

export class Day implements SortableItem {
    _id: string;
    title: string;
    position: number;
    units: Array<Unit> = [];

    constructor ({
        _id, title, position, units
    }) {
        this._id = _id;
        this.title = title;
        this.position = position;
        this.units = units.map((unit) => new Unit(unit));
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

