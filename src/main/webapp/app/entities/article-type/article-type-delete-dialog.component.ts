import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IArticleType } from 'app/shared/model/article-type.model';
import { ArticleTypeService } from './article-type.service';

@Component({
    selector: 'jhi-article-type-delete-dialog',
    templateUrl: './article-type-delete-dialog.component.html'
})
export class ArticleTypeDeleteDialogComponent {
    articleType: IArticleType;

    constructor(
        protected articleTypeService: ArticleTypeService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.articleTypeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'articleTypeListModification',
                content: 'Deleted an articleType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-article-type-delete-popup',
    template: ''
})
export class ArticleTypeDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ articleType }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ArticleTypeDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.articleType = articleType;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/article-type', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/article-type', { outlets: { popup: null } }]);
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
