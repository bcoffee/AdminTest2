import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Admin225SharedModule } from 'app/shared';
import {
    ArticleTypeComponent,
    ArticleTypeDetailComponent,
    ArticleTypeUpdateComponent,
    ArticleTypeDeletePopupComponent,
    ArticleTypeDeleteDialogComponent,
    articleTypeRoute,
    articleTypePopupRoute
} from './';

const ENTITY_STATES = [...articleTypeRoute, ...articleTypePopupRoute];

@NgModule({
    imports: [Admin225SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ArticleTypeComponent,
        ArticleTypeDetailComponent,
        ArticleTypeUpdateComponent,
        ArticleTypeDeleteDialogComponent,
        ArticleTypeDeletePopupComponent
    ],
    entryComponents: [ArticleTypeComponent, ArticleTypeUpdateComponent, ArticleTypeDeleteDialogComponent, ArticleTypeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Admin225ArticleTypeModule {}
