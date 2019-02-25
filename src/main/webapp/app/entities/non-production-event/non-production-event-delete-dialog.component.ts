import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INonProductionEvent } from 'app/shared/model/non-production-event.model';
import { NonProductionEventService } from './non-production-event.service';

@Component({
    selector: 'jhi-non-production-event-delete-dialog',
    templateUrl: './non-production-event-delete-dialog.component.html'
})
export class NonProductionEventDeleteDialogComponent {
    nonProductionEvent: INonProductionEvent;

    constructor(
        protected nonProductionEventService: NonProductionEventService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.nonProductionEventService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'nonProductionEventListModification',
                content: 'Deleted an nonProductionEvent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-non-production-event-delete-popup',
    template: ''
})
export class NonProductionEventDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ nonProductionEvent }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(NonProductionEventDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.nonProductionEvent = nonProductionEvent;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/non-production-event', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/non-production-event', { outlets: { popup: null } }]);
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
