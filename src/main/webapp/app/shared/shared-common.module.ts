import { NgModule } from '@angular/core';

import { Admin225SharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [Admin225SharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [Admin225SharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class Admin225SharedCommonModule {}
