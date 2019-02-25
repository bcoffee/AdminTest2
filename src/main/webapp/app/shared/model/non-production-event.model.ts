import { Moment } from 'moment';
import { IScheduleEvent } from 'app/shared/model/schedule-event.model';

export interface INonProductionEvent {
    id?: number;
    name?: string;
    label?: string;
    start?: Moment;
    end?: Moment;
    scheduleEvent?: IScheduleEvent;
}

export class NonProductionEvent implements INonProductionEvent {
    constructor(
        public id?: number,
        public name?: string,
        public label?: string,
        public start?: Moment,
        public end?: Moment,
        public scheduleEvent?: IScheduleEvent
    ) {}
}
