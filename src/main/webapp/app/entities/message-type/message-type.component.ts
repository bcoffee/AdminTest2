import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMessageType } from 'app/shared/model/message-type.model';
import { AccountService } from 'app/core';
import { MessageTypeService } from './message-type.service';

@Component({
    selector: 'jhi-message-type',
    templateUrl: './message-type.component.html'
})
export class MessageTypeComponent implements OnInit, OnDestroy {
    messageTypes: IMessageType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected messageTypeService: MessageTypeService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.messageTypeService
            .query()
            .pipe(
                filter((res: HttpResponse<IMessageType[]>) => res.ok),
                map((res: HttpResponse<IMessageType[]>) => res.body)
            )
            .subscribe(
                (res: IMessageType[]) => {
                    this.messageTypes = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMessageTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMessageType) {
        return item.id;
    }

    registerChangeInMessageTypes() {
        this.eventSubscriber = this.eventManager.subscribe('messageTypeListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
