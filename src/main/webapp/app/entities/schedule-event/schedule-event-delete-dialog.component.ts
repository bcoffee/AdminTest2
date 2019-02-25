import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IScheduleEvent } from 'app/shared/model/schedule-event.model';
import { ScheduleEventService } from './schedule-event.service';

@Component({
    selector: 'jhi-schedule-event-delete-dialog',
    templateUrl: './schedule-event-delete-dialog.component.html'
})
export class ScheduleEventDeleteDialogComponent {
    scheduleEvent: IScheduleEvent;

    constructor(
        protected scheduleEventService: ScheduleEventService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.scheduleEventService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'scheduleEventListModification',
                content: 'Deleted an scheduleEvent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-schedule-event-delete-popup',
    template: ''
})
export class ScheduleEventDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ scheduleEvent }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ScheduleEventDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.scheduleEvent = scheduleEvent;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/schedule-event', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/schedule-event', { outlets: { popup: null } }]);
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
