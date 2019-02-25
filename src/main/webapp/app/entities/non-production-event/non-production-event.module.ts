import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Admin225SharedModule } from 'app/shared';
import {
    NonProductionEventComponent,
    NonProductionEventDetailComponent,
    NonProductionEventUpdateComponent,
    NonProductionEventDeletePopupComponent,
    NonProductionEventDeleteDialogComponent,
    nonProductionEventRoute,
    nonProductionEventPopupRoute
} from './';

const ENTITY_STATES = [...nonProductionEventRoute, ...nonProductionEventPopupRoute];

@NgModule({
    imports: [Admin225SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        NonProductionEventComponent,
        NonProductionEventDetailComponent,
        NonProductionEventUpdateComponent,
        NonProductionEventDeleteDialogComponent,
        NonProductionEventDeletePopupComponent
    ],
    entryComponents: [
        NonProductionEventComponent,
        NonProductionEventUpdateComponent,
        NonProductionEventDeleteDialogComponent,
        NonProductionEventDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Admin225NonProductionEventModule {}
