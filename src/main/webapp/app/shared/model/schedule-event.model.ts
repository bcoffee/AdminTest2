import { Moment } from 'moment';

export interface IScheduleEvent {
    id?: number;
    name?: string;
    label?: string;
    start?: Moment;
    end?: Moment;
    planned?: boolean;
    cycletimeOverride?: number;
    targetEfficiency?: number;
}

export class ScheduleEvent implements IScheduleEvent {
    constructor(
        public id?: number,
        public name?: string,
        public label?: string,
        public start?: Moment,
        public end?: Moment,
        public planned?: boolean,
        public cycletimeOverride?: number,
        public targetEfficiency?: number
    ) {
        this.planned = this.planned || false;
    }
}
