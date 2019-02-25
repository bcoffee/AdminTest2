import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { INonProductionEvent } from 'app/shared/model/non-production-event.model';
import { NonProductionEventService } from './non-production-event.service';
import { IScheduleEvent } from 'app/shared/model/schedule-event.model';
import { ScheduleEventService } from 'app/entities/schedule-event';

@Component({
    selector: 'jhi-non-production-event-update',
    templateUrl: './non-production-event-update.component.html'
})
export class NonProductionEventUpdateComponent implements OnInit {
    nonProductionEvent: INonProductionEvent;
    isSaving: boolean;

    scheduleevents: IScheduleEvent[];
    start: string;
    endDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected nonProductionEventService: NonProductionEventService,
        protected scheduleEventService: ScheduleEventService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ nonProductionEvent }) => {
            this.nonProductionEvent = nonProductionEvent;
            this.start = this.nonProductionEvent.start != null ? this.nonProductionEvent.start.format(DATE_TIME_FORMAT) : null;
        });
        this.scheduleEventService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IScheduleEvent[]>) => mayBeOk.ok),
                map((response: HttpResponse<IScheduleEvent[]>) => response.body)
            )
            .subscribe((res: IScheduleEvent[]) => (this.scheduleevents = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.nonProductionEvent.start = this.start != null ? moment(this.start, DATE_TIME_FORMAT) : null;
        if (this.nonProductionEvent.id !== undefined) {
            this.subscribeToSaveResponse(this.nonProductionEventService.update(this.nonProductionEvent));
        } else {
            this.subscribeToSaveResponse(this.nonProductionEventService.create(this.nonProductionEvent));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<INonProductionEvent>>) {
        result.subscribe((res: HttpResponse<INonProductionEvent>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackScheduleEventById(index: number, item: IScheduleEvent) {
        return item.id;
    }
}
