/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Admin225TestModule } from '../../../test.module';
import { DataCollectorComponent } from 'app/entities/data-collector/data-collector.component';
import { DataCollectorService } from 'app/entities/data-collector/data-collector.service';
import { DataCollector } from 'app/shared/model/data-collector.model';

describe('Component Tests', () => {
    describe('DataCollector Management Component', () => {
        let comp: DataCollectorComponent;
        let fixture: ComponentFixture<DataCollectorComponent>;
        let service: DataCollectorService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Admin225TestModule],
                declarations: [DataCollectorComponent],
                providers: []
            })
                .overrideTemplate(DataCollectorComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DataCollectorComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataCollectorService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DataCollector(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.dataCollectors[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
