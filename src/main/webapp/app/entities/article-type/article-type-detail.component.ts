import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IArticleType } from 'app/shared/model/article-type.model';

@Component({
    selector: 'jhi-article-type-detail',
    templateUrl: './article-type-detail.component.html'
})
export class ArticleTypeDetailComponent implements OnInit {
    articleType: IArticleType;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ articleType }) => {
            this.articleType = articleType;
        });
    }

    previousState() {
        window.history.back();
    }
}
