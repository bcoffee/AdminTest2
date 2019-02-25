import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INonProductionEvent } from 'app/shared/model/non-production-event.model';

@Component({
    selector: 'jhi-non-production-event-detail',
    templateUrl: './non-production-event-detail.component.html'
})
export class NonProductionEventDetailComponent implements OnInit {
    nonProductionEvent: INonProductionEvent;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ nonProductionEvent }) => {
            this.nonProductionEvent = nonProductionEvent;
        });
    }

    previousState() {
        window.history.back();
    }
}
