import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMessageMap } from 'app/shared/model/message-map.model';
import { MessageMapService } from './message-map.service';
import { IArticle } from 'app/shared/model/article.model';
import { ArticleService } from 'app/entities/article';

@Component({
    selector: 'jhi-message-map-update',
    templateUrl: './message-map-update.component.html'
})
export class MessageMapUpdateComponent implements OnInit {
    messageMap: IMessageMap;
    isSaving: boolean;

    articles: IArticle[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected messageMapService: MessageMapService,
        protected articleService: ArticleService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ messageMap }) => {
            this.messageMap = messageMap;
        });
        this.articleService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IArticle[]>) => mayBeOk.ok),
                map((response: HttpResponse<IArticle[]>) => response.body)
            )
            .subscribe((res: IArticle[]) => (this.articles = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.messageMap.id !== undefined) {
            this.subscribeToSaveResponse(this.messageMapService.update(this.messageMap));
        } else {
            this.subscribeToSaveResponse(this.messageMapService.create(this.messageMap));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMessageMap>>) {
        result.subscribe((res: HttpResponse<IMessageMap>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
