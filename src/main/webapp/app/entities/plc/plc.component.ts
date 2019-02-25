import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPlc } from 'app/shared/model/plc.model';
import { AccountService } from 'app/core';
import { PlcService } from './plc.service';

@Component({
    selector: 'jhi-plc',
    templateUrl: './plc.component.html'
})
export class PlcComponent implements OnInit, OnDestroy {
    plcs: IPlc[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected plcService: PlcService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.plcService
            .query()
            .pipe(
                filter((res: HttpResponse<IPlc[]>) => res.ok),
                map((res: HttpResponse<IPlc[]>) => res.body)
            )
            .subscribe(
                (res: IPlc[]) => {
                    this.plcs = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPlcs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPlc) {
        return item.id;
    }

    registerChangeInPlcs() {
        this.eventSubscriber = this.eventManager.subscribe('plcListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
