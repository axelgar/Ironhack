import { Day } from '../models/day';
import { Unit } from '../models/unit';

export interface GenericResponse {
    message: string;
    error?: string;
    list?: Day;
    card?: Unit;
}
