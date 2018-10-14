import { SortableItem } from '../interfaces/sortable-item';

export class Unit implements SortableItem {
    _id: string;
    title: string;
    description: string;
    position: number;
    dueDate: Date;
    day: string;
    created_at: Date;
    updated_at: Date;

    constructor(rawObj) {
        Object.assign(this, rawObj);
    }

    setDay(id) {
        this.day = id;
    }
}
