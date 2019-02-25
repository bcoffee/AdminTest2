import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Admin225SharedModule } from 'app/shared';
import {
    ModelComponent,
    ModelDetailComponent,
    ModelUpdateComponent,
    ModelDeletePopupComponent,
    ModelDeleteDialogComponent,
    modelRoute,
    modelPopupRoute
} from './';

const ENTITY_STATES = [...modelRoute, ...modelPopupRoute];

@NgModule({
    imports: [Admin225SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ModelComponent, ModelDetailComponent, ModelUpdateComponent, ModelDeleteDialogComponent, ModelDeletePopupComponent],
    entryComponents: [ModelComponent, ModelUpdateComponent, ModelDeleteDialogComponent, ModelDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Admin225ModelModule {}
