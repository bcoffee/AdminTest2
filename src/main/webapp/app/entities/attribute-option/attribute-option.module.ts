import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Admin225SharedModule } from 'app/shared';
import {
    AttributeOptionComponent,
    AttributeOptionDetailComponent,
    AttributeOptionUpdateComponent,
    AttributeOptionDeletePopupComponent,
    AttributeOptionDeleteDialogComponent,
    attributeOptionRoute,
    attributeOptionPopupRoute
} from './';

const ENTITY_STATES = [...attributeOptionRoute, ...attributeOptionPopupRoute];

@NgModule({
    imports: [Admin225SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AttributeOptionComponent,
        AttributeOptionDetailComponent,
        AttributeOptionUpdateComponent,
        AttributeOptionDeleteDialogComponent,
        AttributeOptionDeletePopupComponent
    ],
    entryComponents: [
        AttributeOptionComponent,
        AttributeOptionUpdateComponent,
        AttributeOptionDeleteDialogComponent,
        AttributeOptionDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Admin225AttributeOptionModule {}
