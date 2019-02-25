/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Admin225TestModule } from '../../../test.module';
import { DataCollectorDetailComponent } from 'app/entities/data-collector/data-collector-detail.component';
import { DataCollector } from 'app/shared/model/data-collector.model';

describe('Component Tests', () => {
    describe('DataCollector Management Detail Component', () => {
        let comp: DataCollectorDetailComponent;
        let fixture: ComponentFixture<DataCollectorDetailComponent>;
        const route = ({ data: of({ dataCollector: new DataCollector(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Admin225TestModule],
                declarations: [DataCollectorDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DataCollectorDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DataCollectorDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.dataCollector).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
