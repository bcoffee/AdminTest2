import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ArticleType } from 'app/shared/model/article-type.model';
import { ArticleTypeService } from './article-type.service';
import { ArticleTypeComponent } from './article-type.component';
import { ArticleTypeDetailComponent } from './article-type-detail.component';
import { ArticleTypeUpdateComponent } from './article-type-update.component';
import { ArticleTypeDeletePopupComponent } from './article-type-delete-dialog.component';
import { IArticleType } from 'app/shared/model/article-type.model';

@Injectable({ providedIn: 'root' })
export class ArticleTypeResolve implements Resolve<IArticleType> {
    constructor(private service: ArticleTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IArticleType> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ArticleType>) => response.ok),
                map((articleType: HttpResponse<ArticleType>) => articleType.body)
            );
        }
        return of(new ArticleType());
    }
}

export const articleTypeRoute: Routes = [
    {
        path: '',
        component: ArticleTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ArticleTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ArticleTypeDetailComponent,
        resolve: {
            articleType: ArticleTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ArticleTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ArticleTypeUpdateComponent,
        resolve: {
            articleType: ArticleTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ArticleTypes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ArticleTypeUpdateComponent,
        resolve: {
            articleType: ArticleTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ArticleTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const articleTypePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ArticleTypeDeletePopupComponent,
        resolve: {
            articleType: ArticleTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ArticleTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
