/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Admin225TestModule } from '../../../test.module';
import { NonProductionEventComponent } from 'app/entities/non-production-event/non-production-event.component';
import { NonProductionEventService } from 'app/entities/non-production-event/non-production-event.service';
import { NonProductionEvent } from 'app/shared/model/non-production-event.model';

describe('Component Tests', () => {
    describe('NonProductionEvent Management Component', () => {
        let comp: NonProductionEventComponent;
        let fixture: ComponentFixture<NonProductionEventComponent>;
        let service: NonProductionEventService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Admin225TestModule],
                declarations: [NonProductionEventComponent],
                providers: []
            })
                .overrideTemplate(NonProductionEventComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NonProductionEventComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NonProductionEventService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new NonProductionEvent(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.nonProductionEvents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
