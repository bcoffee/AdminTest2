import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDataCollector } from 'app/shared/model/data-collector.model';

@Component({
    selector: 'jhi-data-collector-detail',
    templateUrl: './data-collector-detail.component.html'
})
export class DataCollectorDetailComponent implements OnInit {
    dataCollector: IDataCollector;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dataCollector }) => {
            this.dataCollector = dataCollector;
        });
    }

    previousState() {
        window.history.back();
    }
}
