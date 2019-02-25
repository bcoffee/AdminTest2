import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DataCollector } from 'app/shared/model/data-collector.model';
import { DataCollectorService } from './data-collector.service';
import { DataCollectorComponent } from './data-collector.component';
import { DataCollectorDetailComponent } from './data-collector-detail.component';
import { DataCollectorUpdateComponent } from './data-collector-update.component';
import { DataCollectorDeletePopupComponent } from './data-collector-delete-dialog.component';
import { IDataCollector } from 'app/shared/model/data-collector.model';

@Injectable({ providedIn: 'root' })
export class DataCollectorResolve implements Resolve<IDataCollector> {
    constructor(private service: DataCollectorService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDataCollector> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DataCollector>) => response.ok),
                map((dataCollector: HttpResponse<DataCollector>) => dataCollector.body)
            );
        }
        return of(new DataCollector());
    }
}

export const dataCollectorRoute: Routes = [
    {
        path: '',
        component: DataCollectorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DataCollectors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DataCollectorDetailComponent,
        resolve: {
            dataCollector: DataCollectorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DataCollectors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DataCollectorUpdateComponent,
        resolve: {
            dataCollector: DataCollectorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DataCollectors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DataCollectorUpdateComponent,
        resolve: {
            dataCollector: DataCollectorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DataCollectors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dataCollectorPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DataCollectorDeletePopupComponent,
        resolve: {
            dataCollector: DataCollectorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DataCollectors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
