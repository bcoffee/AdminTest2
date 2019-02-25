import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IScheduleEvent } from 'app/shared/model/schedule-event.model';
import { ScheduleEventService } from './schedule-event.service';

@Component({
    selector: 'jhi-schedule-event-update',
    templateUrl: './schedule-event-update.component.html'
})
export class ScheduleEventUpdateComponent implements OnInit {
    scheduleEvent: IScheduleEvent;
    isSaving: boolean;
    start: string;
    end: string;

    constructor(protected scheduleEventService: ScheduleEventService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ scheduleEvent }) => {
            this.scheduleEvent = scheduleEvent;
            this.start = this.scheduleEvent.start != null ? this.scheduleEvent.start.format(DATE_TIME_FORMAT) : null;
            this.end = this.scheduleEvent.end != null ? this.scheduleEvent.end.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.scheduleEvent.start = this.start != null ? moment(this.start, DATE_TIME_FORMAT) : null;
        this.scheduleEvent.end = this.end != null ? moment(this.end, DATE_TIME_FORMAT) : null;
        if (this.scheduleEvent.id !== undefined) {
            this.subscribeToSaveResponse(this.scheduleEventService.update(this.scheduleEvent));
        } else {
            this.subscribeToSaveResponse(this.scheduleEventService.create(this.scheduleEvent));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IScheduleEvent>>) {
        result.subscribe((res: HttpResponse<IScheduleEvent>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
