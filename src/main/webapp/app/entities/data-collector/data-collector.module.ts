import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Admin225SharedModule } from 'app/shared';
import {
    DataCollectorComponent,
    DataCollectorDetailComponent,
    DataCollectorUpdateComponent,
    DataCollectorDeletePopupComponent,
    DataCollectorDeleteDialogComponent,
    dataCollectorRoute,
    dataCollectorPopupRoute
} from './';

const ENTITY_STATES = [...dataCollectorRoute, ...dataCollectorPopupRoute];

@NgModule({
    imports: [Admin225SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DataCollectorComponent,
        DataCollectorDetailComponent,
        DataCollectorUpdateComponent,
        DataCollectorDeleteDialogComponent,
        DataCollectorDeletePopupComponent
    ],
    entryComponents: [
        DataCollectorComponent,
        DataCollectorUpdateComponent,
        DataCollectorDeleteDialogComponent,
        DataCollectorDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Admin225DataCollectorModule {}
