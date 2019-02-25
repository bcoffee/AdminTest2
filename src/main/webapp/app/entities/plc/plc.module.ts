import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Admin225SharedModule } from 'app/shared';
import {
    PlcComponent,
    PlcDetailComponent,
    PlcUpdateComponent,
    PlcDeletePopupComponent,
    PlcDeleteDialogComponent,
    plcRoute,
    plcPopupRoute
} from './';

const ENTITY_STATES = [...plcRoute, ...plcPopupRoute];

@NgModule({
    imports: [Admin225SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [PlcComponent, PlcDetailComponent, PlcUpdateComponent, PlcDeleteDialogComponent, PlcDeletePopupComponent],
    entryComponents: [PlcComponent, PlcUpdateComponent, PlcDeleteDialogComponent, PlcDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Admin225PlcModule {}
