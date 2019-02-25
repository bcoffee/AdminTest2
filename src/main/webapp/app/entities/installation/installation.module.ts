import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Admin225SharedModule } from 'app/shared';
import {
    InstallationComponent,
    InstallationDetailComponent,
    InstallationUpdateComponent,
    InstallationDeletePopupComponent,
    InstallationDeleteDialogComponent,
    installationRoute,
    installationPopupRoute
} from './';

const ENTITY_STATES = [...installationRoute, ...installationPopupRoute];

@NgModule({
    imports: [Admin225SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        InstallationComponent,
        InstallationDetailComponent,
        InstallationUpdateComponent,
        InstallationDeleteDialogComponent,
        InstallationDeletePopupComponent
    ],
    entryComponents: [
        InstallationComponent,
        InstallationUpdateComponent,
        InstallationDeleteDialogComponent,
        InstallationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Admin225InstallationModule {}