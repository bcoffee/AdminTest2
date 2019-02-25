import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IScheduleEvent } from 'app/shared/model/schedule-event.model';

@Component({
    selector: 'jhi-schedule-event-detail',
    templateUrl: './schedule-event-detail.component.html'
})
export class ScheduleEventDetailComponent implements OnInit {
    scheduleEvent: IScheduleEvent;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ scheduleEvent }) => {
            this.scheduleEvent = scheduleEvent;
        });
    }

    previousState() {
        window.history.back();
    }
}
