import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAttributeValue } from 'app/shared/model/attribute-value.model';
import { AttributeValueService } from './attribute-value.service';
import { IArticle } from 'app/shared/model/article.model';
import { ArticleService } from 'app/entities/article';
import { IAttributeOption } from 'app/shared/model/attribute-option.model';
import { AttributeOptionService } from 'app/entities/attribute-option';

@Component({
    selector: 'jhi-attribute-value-update',
    templateUrl: './attribute-value-update.component.html'
})
export class AttributeValueUpdateComponent implements OnInit {
    attributeValue: IAttributeValue;
    isSaving: boolean;

    articles: IArticle[];

    options: IAttributeOption[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected attributeValueService: AttributeValueService,
        protected articleService: ArticleService,
        protected attributeOptionService: AttributeOptionService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ attributeValue }) => {
            this.attributeValue = attributeValue;
        });
        this.articleService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IArticle[]>) => mayBeOk.ok),
                map((response: HttpResponse<IArticle[]>) => response.body)
            )
            .subscribe((res: IArticle[]) => (this.articles = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.attributeOptionService
            .query({ filter: 'attributevalue-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IAttributeOption[]>) => mayBeOk.ok),
                map((response: HttpResponse<IAttributeOption[]>) => response.body)
            )
            .subscribe(
                (res: IAttributeOption[]) => {
                    if (!this.attributeValue.option || !this.attributeValue.option.id) {
                        this.options = res;
                    } else {
                        this.attributeOptionService
                            .find(this.attributeValue.option.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IAttributeOption>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IAttributeOption>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IAttributeOption) => (this.options = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.attributeValue.id !== undefined) {
            this.subscribeToSaveResponse(this.attributeValueService.update(this.attributeValue));
        } else {
            this.subscribeToSaveResponse(this.attributeValueService.create(this.attributeValue));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAttributeValue>>) {
        result.subscribe((res: HttpResponse<IAttributeValue>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAttributeOptionById(index: number, item: IAttributeOption) {
        return item.id;
    }
}
