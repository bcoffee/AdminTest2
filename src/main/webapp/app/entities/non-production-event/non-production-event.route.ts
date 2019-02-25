import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NonProductionEvent } from 'app/shared/model/non-production-event.model';
import { NonProductionEventService } from './non-production-event.service';
import { NonProductionEventComponent } from './non-production-event.component';
import { NonProductionEventDetailComponent } from './non-production-event-detail.component';
import { NonProductionEventUpdateComponent } from './non-production-event-update.component';
import { NonProductionEventDeletePopupComponent } from './non-production-event-delete-dialog.component';
import { INonProductionEvent } from 'app/shared/model/non-production-event.model';

@Injectable({ providedIn: 'root' })
export class NonProductionEventResolve implements Resolve<INonProductionEvent> {
    constructor(private service: NonProductionEventService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INonProductionEvent> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<NonProductionEvent>) => response.ok),
                map((nonProductionEvent: HttpResponse<NonProductionEvent>) => nonProductionEvent.body)
            );
        }
        return of(new NonProductionEvent());
    }
}

export const nonProductionEventRoute: Routes = [
    {
        path: '',
        component: NonProductionEventComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NonProductionEvents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: NonProductionEventDetailComponent,
        resolve: {
            nonProductionEvent: NonProductionEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NonProductionEvents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: NonProductionEventUpdateComponent,
        resolve: {
            nonProductionEvent: NonProductionEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NonProductionEvents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: NonProductionEventUpdateComponent,
        resolve: {
            nonProductionEvent: NonProductionEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NonProductionEvents'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const nonProductionEventPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: NonProductionEventDeletePopupComponent,
        resolve: {
            nonProductionEvent: NonProductionEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NonProductionEvents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
