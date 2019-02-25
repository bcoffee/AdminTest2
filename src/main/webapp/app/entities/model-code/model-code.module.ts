import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Admin225SharedModule } from 'app/shared';
import {
    ModelCodeComponent,
    ModelCodeDetailComponent,
    ModelCodeUpdateComponent,
    ModelCodeDeletePopupComponent,
    ModelCodeDeleteDialogComponent,
    modelCodeRoute,
    modelCodePopupRoute
} from './';

const ENTITY_STATES = [...modelCodeRoute, ...modelCodePopupRoute];

@NgModule({
    imports: [Admin225SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ModelCodeComponent,
        ModelCodeDetailComponent,
        ModelCodeUpdateComponent,
        ModelCodeDeleteDialogComponent,
        ModelCodeDeletePopupComponent
    ],
    entryComponents: [ModelCodeComponent, ModelCodeUpdateComponent, ModelCodeDeleteDialogComponent, ModelCodeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Admin225ModelCodeModule {}
