import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Plc } from 'app/shared/model/plc.model';
import { PlcService } from './plc.service';
import { PlcComponent } from './plc.component';
import { PlcDetailComponent } from './plc-detail.component';
import { PlcUpdateComponent } from './plc-update.component';
import { PlcDeletePopupComponent } from './plc-delete-dialog.component';
import { IPlc } from 'app/shared/model/plc.model';

@Injectable({ providedIn: 'root' })
export class PlcResolve implements Resolve<IPlc> {
    constructor(private service: PlcService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPlc> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Plc>) => response.ok),
                map((plc: HttpResponse<Plc>) => plc.body)
            );
        }
        return of(new Plc());
    }
}

export const plcRoute: Routes = [
    {
        path: '',
        component: PlcComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Plcs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PlcDetailComponent,
        resolve: {
            plc: PlcResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Plcs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PlcUpdateComponent,
        resolve: {
            plc: PlcResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Plcs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PlcUpdateComponent,
        resolve: {
            plc: PlcResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Plcs'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const plcPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PlcDeletePopupComponent,
        resolve: {
            plc: PlcResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Plcs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
