import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { INonProductionEvent } from 'app/shared/model/non-production-event.model';
import { AccountService } from 'app/core';
import { NonProductionEventService } from './non-production-event.service';

@Component({
    selector: 'jhi-non-production-event',
    templateUrl: './non-production-event.component.html'
})
export class NonProductionEventComponent implements OnInit, OnDestroy {
    nonProductionEvents: INonProductionEvent[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected nonProductionEventService: NonProductionEventService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.nonProductionEventService
            .query()
            .pipe(
                filter((res: HttpResponse<INonProductionEvent[]>) => res.ok),
                map((res: HttpResponse<INonProductionEvent[]>) => res.body)
            )
            .subscribe(
                (res: INonProductionEvent[]) => {
                    this.nonProductionEvents = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInNonProductionEvents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: INonProductionEvent) {
        return item.id;
    }

    registerChangeInNonProductionEvents() {
        this.eventSubscriber = this.eventManager.subscribe('nonProductionEventListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
