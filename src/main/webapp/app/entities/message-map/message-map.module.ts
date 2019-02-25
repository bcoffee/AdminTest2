import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Admin225SharedModule } from 'app/shared';
import {
    MessageMapComponent,
    MessageMapDetailComponent,
    MessageMapUpdateComponent,
    MessageMapDeletePopupComponent,
    MessageMapDeleteDialogComponent,
    messageMapRoute,
    messageMapPopupRoute
} from './';

const ENTITY_STATES = [...messageMapRoute, ...messageMapPopupRoute];

@NgModule({
    imports: [Admin225SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MessageMapComponent,
        MessageMapDetailComponent,
        MessageMapUpdateComponent,
        MessageMapDeleteDialogComponent,
        MessageMapDeletePopupComponent
    ],
    entryComponents: [MessageMapComponent, MessageMapUpdateComponent, MessageMapDeleteDialogComponent, MessageMapDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Admin225MessageMapModule {}