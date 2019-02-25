import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IArticle } from 'app/shared/model/article.model';
import { ArticleService } from './article.service';
import { IArticleType } from 'app/shared/model/article-type.model';
import { ArticleTypeService } from 'app/entities/article-type';
import { IInstallation } from 'app/shared/model/installation.model';
import { InstallationService } from 'app/entities/installation';

@Component({
    selector: 'jhi-article-update',
    templateUrl: './article-update.component.html'
})
export class ArticleUpdateComponent implements OnInit {
    article: IArticle;
    isSaving: boolean;

    parents: IArticle[];

    types: IArticleType[];

    installations: IInstallation[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected articleService: ArticleService,
        protected articleTypeService: ArticleTypeService,
        protected installationService: InstallationService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ article }) => {
            this.article = article;
        });
        this.articleService
            .query({ filter: 'article-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IArticle[]>) => mayBeOk.ok),
                map((response: HttpResponse<IArticle[]>) => response.body)
            )
            .subscribe(
                (res: IArticle[]) => {
                    if (!this.article.parent || !this.article.parent.id) {
                        this.parents = res;
                    } else {
                        this.articleService
                            .find(this.article.parent.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IArticle>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IArticle>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IArticle) => (this.parents = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.articleTypeService
            .query({ filter: 'article-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IArticleType[]>) => mayBeOk.ok),
                map((response: HttpResponse<IArticleType[]>) => response.body)
            )
            .subscribe(
                (res: IArticleType[]) => {
                    if (!this.article.type || !this.article.type.id) {
                        this.types = res;
                    } else {
                        this.articleTypeService
                            .find(this.article.type.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IArticleType>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IArticleType>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IArticleType) => (this.types = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.installationService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IInstallation[]>) => mayBeOk.ok),
                map((response: HttpResponse<IInstallation[]>) => response.body)
            )
            .subscribe((res: IInstallation[]) => (this.installations = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.article.id !== undefined) {
            this.subscribeToSaveResponse(this.articleService.update(this.article));
        } else {
            this.subscribeToSaveResponse(this.articleService.create(this.article));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IArticle>>) {
        result.subscribe((res: HttpResponse<IArticle>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackArticleById(index: number, item: IArticle) {
        return item.id;
    }

    trackArticleTypeById(index: number, item: IArticleType) {
        return item.id;
    }

    trackInstallationById(index: number, item: IInstallation) {
        return item.id;
    }
}
