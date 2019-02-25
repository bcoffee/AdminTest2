import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IBaseline } from 'app/shared/model/baseline.model';
import { BaselineService } from './baseline.service';
import { IArticle } from 'app/shared/model/article.model';
import { ArticleService } from 'app/entities/article';
import { IModel } from 'app/shared/model/model.model';
import { ModelService } from 'app/entities/model';

@Component({
    selector: 'jhi-baseline-update',
    templateUrl: './baseline-update.component.html'
})
export class BaselineUpdateComponent implements OnInit {
    baseline: IBaseline;
    isSaving: boolean;

    articles: IArticle[];

    models: IModel[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected baselineService: BaselineService,
        protected articleService: ArticleService,
        protected modelService: ModelService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ baseline }) => {
            this.baseline = baseline;
        });
        this.articleService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IArticle[]>) => mayBeOk.ok),
                map((response: HttpResponse<IArticle[]>) => response.body)
            )
            .subscribe((res: IArticle[]) => (this.articles = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.modelService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IModel[]>) => mayBeOk.ok),
                map((response: HttpResponse<IModel[]>) => response.body)
            )
            .subscribe((res: IModel[]) => (this.models = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.baseline.id !== undefined) {
            this.subscribeToSaveResponse(this.baselineService.update(this.baseline));
        } else {
            this.subscribeToSaveResponse(this.baselineService.create(this.baseline));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IBaseline>>) {
        result.subscribe((res: HttpResponse<IBaseline>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackModelById(index: number, item: IModel) {
        return item.id;
    }
}
