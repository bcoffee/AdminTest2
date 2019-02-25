import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDataCollector } from 'app/shared/model/data-collector.model';
import { DataCollectorService } from './data-collector.service';
import { IPlc } from 'app/shared/model/plc.model';
import { PlcService } from 'app/entities/plc';

@Component({
    selector: 'jhi-data-collector-update',
    templateUrl: './data-collector-update.component.html'
})
export class DataCollectorUpdateComponent implements OnInit {
    dataCollector: IDataCollector;
    isSaving: boolean;

    plcs: IPlc[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected dataCollectorService: DataCollectorService,
        protected plcService: PlcService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ dataCollector }) => {
            this.dataCollector = dataCollector;
        });
        this.plcService
            .query({ filter: 'datacollector-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IPlc[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPlc[]>) => response.body)
            )
            .subscribe(
                (res: IPlc[]) => {
                    if (!this.dataCollector.plc || !this.dataCollector.plc.id) {
                        this.plcs = res;
                    } else {
                        this.plcService
                            .find(this.dataCollector.plc.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IPlc>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IPlc>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IPlc) => (this.plcs = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.dataCollector.id !== undefined) {
            this.subscribeToSaveResponse(this.dataCollectorService.update(this.dataCollector));
        } else {
            this.subscribeToSaveResponse(this.dataCollectorService.create(this.dataCollector));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDataCollector>>) {
        result.subscribe((res: HttpResponse<IDataCollector>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPlcById(index: number, item: IPlc) {
        return item.id;
    }
}
