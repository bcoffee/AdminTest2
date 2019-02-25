import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IInstallation } from 'app/shared/model/installation.model';
import { InstallationService } from './installation.service';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer';

@Component({
    selector: 'jhi-installation-update',
    templateUrl: './installation-update.component.html'
})
export class InstallationUpdateComponent implements OnInit {
    installation: IInstallation;
    isSaving: boolean;

    customers: ICustomer[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected installationService: InstallationService,
        protected customerService: CustomerService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ installation }) => {
            this.installation = installation;
        });
        this.customerService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICustomer[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICustomer[]>) => response.body)
            )
            .subscribe((res: ICustomer[]) => (this.customers = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.installation.id !== undefined) {
            this.subscribeToSaveResponse(this.installationService.update(this.installation));
        } else {
            this.subscribeToSaveResponse(this.installationService.create(this.installation));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IInstallation>>) {
        result.subscribe((res: HttpResponse<IInstallation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCustomerById(index: number, item: ICustomer) {
        return item.id;
    }
}
