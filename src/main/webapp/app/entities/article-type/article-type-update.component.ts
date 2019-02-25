import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IArticleType } from 'app/shared/model/article-type.model';
import { ArticleTypeService } from './article-type.service';

@Component({
    selector: 'jhi-article-type-update',
    templateUrl: './article-type-update.component.html'
})
export class ArticleTypeUpdateComponent implements OnInit {
    articleType: IArticleType;
    isSaving: boolean;

    constructor(protected articleTypeService: ArticleTypeService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ articleType }) => {
            this.articleType = articleType;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.articleType.id !== undefined) {
            this.subscribeToSaveResponse(this.articleTypeService.update(this.articleType));
        } else {
            this.subscribeToSaveResponse(this.articleTypeService.create(this.articleType));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IArticleType>>) {
        result.subscribe((res: HttpResponse<IArticleType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
