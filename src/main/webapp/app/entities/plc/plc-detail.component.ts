import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlc } from 'app/shared/model/plc.model';

@Component({
    selector: 'jhi-plc-detail',
    templateUrl: './plc-detail.component.html'
})
export class PlcDetailComponent implements OnInit {
    plc: IPlc;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ plc }) => {
            this.plc = plc;
        });
    }

    previousState() {
        window.history.back();
    }
}
