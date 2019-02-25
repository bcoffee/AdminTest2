import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Admin225SharedModule } from 'app/shared';
import {
    ScheduleEventComponent,
    ScheduleEventDetailComponent,
    ScheduleEventUpdateComponent,
    ScheduleEventDeletePopupComponent,
    ScheduleEventDeleteDialogComponent,
    scheduleEventRoute,
    scheduleEventPopupRoute
} from './';

const ENTITY_STATES = [...scheduleEventRoute, ...scheduleEventPopupRoute];

@NgModule({
    imports: [Admin225SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ScheduleEventComponent,
        ScheduleEventDetailComponent,
        ScheduleEventUpdateComponent,
        ScheduleEventDeleteDialogComponent,
        ScheduleEventDeletePopupComponent
    ],
    entryComponents: [
        ScheduleEventComponent,
        ScheduleEventUpdateComponent,
        ScheduleEventDeleteDialogComponent,
        ScheduleEventDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Admin225ScheduleEventModule {}
