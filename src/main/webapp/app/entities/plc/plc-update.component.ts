import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IPlc } from 'app/shared/model/plc.model';
import { PlcService } from './plc.service';

@Component({
    selector: 'jhi-plc-update',
    templateUrl: './plc-update.component.html'
})
export class PlcUpdateComponent implements OnInit {
    plc: IPlc;
    isSaving: boolean;

    constructor(protected plcService: PlcService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ plc }) => {
            this.plc = plc;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.plc.id !== undefined) {
            this.subscribeToSaveResponse(this.plcService.update(this.plc));
        } else {
            this.subscribeToSaveResponse(this.plcService.create(this.plc));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlc>>) {
        result.subscribe((res: HttpResponse<IPlc>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
