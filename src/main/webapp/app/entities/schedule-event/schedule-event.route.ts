import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ScheduleEvent } from 'app/shared/model/schedule-event.model';
import { ScheduleEventService } from './schedule-event.service';
import { ScheduleEventComponent } from './schedule-event.component';
import { ScheduleEventDetailComponent } from './schedule-event-detail.component';
import { ScheduleEventUpdateComponent } from './schedule-event-update.component';
import { ScheduleEventDeletePopupComponent } from './schedule-event-delete-dialog.component';
import { IScheduleEvent } from 'app/shared/model/schedule-event.model';

@Injectable({ providedIn: 'root' })
export class ScheduleEventResolve implements Resolve<IScheduleEvent> {
    constructor(private service: ScheduleEventService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IScheduleEvent> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ScheduleEvent>) => response.ok),
                map((scheduleEvent: HttpResponse<ScheduleEvent>) => scheduleEvent.body)
            );
        }
        return of(new ScheduleEvent());
    }
}

export const scheduleEventRoute: Routes = [
    {
        path: '',
        component: ScheduleEventComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ScheduleEvents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ScheduleEventDetailComponent,
        resolve: {
            scheduleEvent: ScheduleEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ScheduleEvents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ScheduleEventUpdateComponent,
        resolve: {
            scheduleEvent: ScheduleEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ScheduleEvents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ScheduleEventUpdateComponent,
        resolve: {
            scheduleEvent: ScheduleEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ScheduleEvents'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const scheduleEventPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ScheduleEventDeletePopupComponent,
        resolve: {
            scheduleEvent: ScheduleEventResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ScheduleEvents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
