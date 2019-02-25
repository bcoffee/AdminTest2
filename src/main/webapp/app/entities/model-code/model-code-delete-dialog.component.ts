import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IModelCode } from 'app/shared/model/model-code.model';
import { ModelCodeService } from './model-code.service';

@Component({
    selector: 'jhi-model-code-delete-dialog',
    templateUrl: './model-code-delete-dialog.component.html'
})
export class ModelCodeDeleteDialogComponent {
    modelCode: IModelCode;

    constructor(
        protected modelCodeService: ModelCodeService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.modelCodeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'modelCodeListModification',
                content: 'Deleted an modelCode'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-model-code-delete-popup',
    template: ''
})
export class ModelCodeDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ modelCode }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ModelCodeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.modelCode = modelCode;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/model-code', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/model-code', { outlets: { popup: null } }]);
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