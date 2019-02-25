import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IArticleType } from 'app/shared/model/article-type.model';
import { AccountService } from 'app/core';
import { ArticleTypeService } from './article-type.service';

@Component({
    selector: 'jhi-article-type',
    templateUrl: './article-type.component.html'
})
export class ArticleTypeComponent implements OnInit, OnDestroy {
    articleTypes: IArticleType[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected articleTypeService: ArticleTypeService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.articleTypeService
            .query()
            .pipe(
                filter((res: HttpResponse<IArticleType[]>) => res.ok),
                map((res: HttpResponse<IArticleType[]>) => res.body)
            )
            .subscribe(
                (res: IArticleType[]) => {
                    this.articleTypes = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInArticleTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IArticleType) {
        return item.id;
    }

    registerChangeInArticleTypes() {
        this.eventSubscriber = this.eventManager.subscribe('articleTypeListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
