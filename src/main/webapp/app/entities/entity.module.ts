import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'customer',
                loadChildren: './customer/customer.module#Admin225CustomerModule'
            },
            {
                path: 'installation',
                loadChildren: './installation/installation.module#Admin225InstallationModule'
            },
            {
                path: 'schedule-event',
                loadChildren: './schedule-event/schedule-event.module#Admin225ScheduleEventModule'
            },
            {
                path: 'non-production-event',
                loadChildren: './non-production-event/non-production-event.module#Admin225NonProductionEventModule'
            },
            {
                path: 'article-type',
                loadChildren: './article-type/article-type.module#Admin225ArticleTypeModule'
            },
            {
                path: 'article',
                loadChildren: './article/article.module#Admin225ArticleModule'
            },
            {
                path: 'message-type',
                loadChildren: './message-type/message-type.module#Admin225MessageTypeModule'
            },
            {
                path: 'message-map',
                loadChildren: './message-map/message-map.module#Admin225MessageMapModule'
            },
            {
                path: 'baseline',
                loadChildren: './baseline/baseline.module#Admin225BaselineModule'
            },
            {
                path: 'model',
                loadChildren: './model/model.module#Admin225ModelModule'
            },
            {
                path: 'model-code',
                loadChildren: './model-code/model-code.module#Admin225ModelCodeModule'
            },
            {
                path: 'attribute',
                loadChildren: './attribute/attribute.module#Admin225AttributeModule'
            },
            {
                path: 'attribute-option',
                loadChildren: './attribute-option/attribute-option.module#Admin225AttributeOptionModule'
            },
            {
                path: 'attribute-value',
                loadChildren: './attribute-value/attribute-value.module#Admin225AttributeValueModule'
            },
            {
                path: 'data-collector',
                loadChildren: './data-collector/data-collector.module#Admin225DataCollectorModule'
            },
            {
                path: 'plc',
                loadChildren: './plc/plc.module#Admin225PlcModule'
            },
            {
                path: 'device',
                loadChildren: './device/device.module#Admin225DeviceModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Admin225EntityModule {}
