import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Admin225SharedModule } from 'app/shared';
import {
    MessageTypeComponent,
    MessageTypeDetailComponent,
    MessageTypeUpdateComponent,
    MessageTypeDeletePopupComponent,
    MessageTypeDeleteDialogComponent,
    messageTypeRoute,
    messageTypePopupRoute
} from './';

const ENTITY_STATES = [...messageTypeRoute, ...messageTypePopupRoute];

@NgModule({
    imports: [Admin225SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MessageTypeComponent,
        MessageTypeDetailComponent,
        MessageTypeUpdateComponent,
        MessageTypeDeleteDialogComponent,
        MessageTypeDeletePopupComponent
    ],
    entryComponents: [MessageTypeComponent, MessageTypeUpdateComponent, MessageTypeDeleteDialogComponent, MessageTypeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Admin225MessageTypeModule {}
