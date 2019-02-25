import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDataCollector } from 'app/shared/model/data-collector.model';
import { DataCollectorService } from './data-collector.service';

@Component({
    selector: 'jhi-data-collector-delete-dialog',
    templateUrl: './data-collector-delete-dialog.component.html'
})
export class DataCollectorDeleteDialogComponent {
    dataCollector: IDataCollector;

    constructor(
        protected dataCollectorService: DataCollectorService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dataCollectorService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'dataCollectorListModification',
                content: 'Deleted an dataCollector'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-data-collector-delete-popup',
    template: ''
})
export class DataCollectorDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dataCollector }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DataCollectorDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.dataCollector = dataCollector;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/data-collector', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/data-collector', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
