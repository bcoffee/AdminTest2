import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IScheduleEvent } from 'app/shared/model/schedule-event.model';
import { AccountService } from 'app/core';
import { ScheduleEventService } from './schedule-event.service';

@Component({
    selector: 'jhi-schedule-event',
    templateUrl: './schedule-event.component.html'
})
export class ScheduleEventComponent implements OnInit, OnDestroy {
    scheduleEvents: IScheduleEvent[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected scheduleEventService: ScheduleEventService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.scheduleEventService
            .query()
            .pipe(
                filter((res: HttpResponse<IScheduleEvent[]>) => res.ok),
                map((res: HttpResponse<IScheduleEvent[]>) => res.body)
            )
            .subscribe(
                (res: IScheduleEvent[]) => {
                    this.scheduleEvents = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInScheduleEvents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IScheduleEvent) {
        return item.id;
    }

    registerChangeInScheduleEvents() {
        this.eventSubscriber = this.eventManager.subscribe('scheduleEventListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
