import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlc } from 'app/shared/model/plc.model';
import { PlcService } from './plc.service';

@Component({
    selector: 'jhi-plc-delete-dialog',
    templateUrl: './plc-delete-dialog.component.html'
})
export class PlcDeleteDialogComponent {
    plc: IPlc;

    constructor(protected plcService: PlcService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.plcService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'plcListModification',
                content: 'Deleted an plc'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-plc-delete-popup',
    template: ''
})
export class PlcDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ plc }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PlcDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.plc = plc;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/plc', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/plc', { outlets: { popup: null } }]);
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
