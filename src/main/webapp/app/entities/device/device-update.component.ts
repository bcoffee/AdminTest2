import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDevice } from 'app/shared/model/device.model';
import { DeviceService } from './device.service';
import { IModel } from 'app/shared/model/model.model';
import { ModelService } from 'app/entities/model';
import { IDataCollector } from 'app/shared/model/data-collector.model';
import { DataCollectorService } from 'app/entities/data-collector';

@Component({
    selector: 'jhi-device-update',
    templateUrl: './device-update.component.html'
})
export class DeviceUpdateComponent implements OnInit {
    device: IDevice;
    isSaving: boolean;

    models: IModel[];

    datacollectors: IDataCollector[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected deviceService: DeviceService,
        protected modelService: ModelService,
        protected dataCollectorService: DataCollectorService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ device }) => {
            this.device = device;
        });
        this.modelService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IModel[]>) => mayBeOk.ok),
                map((response: HttpResponse<IModel[]>) => response.body)
            )
            .subscribe((res: IModel[]) => (this.models = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.dataCollectorService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IDataCollector[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDataCollector[]>) => response.body)
            )
            .subscribe((res: IDataCollector[]) => (this.datacollectors = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.device.id !== undefined) {
            this.subscribeToSaveResponse(this.deviceService.update(this.device));
        } else {
            this.subscribeToSaveResponse(this.deviceService.create(this.device));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDevice>>) {
        result.subscribe((res: HttpResponse<IDevice>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackModelById(index: number, item: IModel) {
        return item.id;
    }

    trackDataCollectorById(index: number, item: IDataCollector) {
        return item.id;
    }
}
