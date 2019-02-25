/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Admin225TestModule } from '../../../test.module';
import { ScheduleEventComponent } from 'app/entities/schedule-event/schedule-event.component';
import { ScheduleEventService } from 'app/entities/schedule-event/schedule-event.service';
import { ScheduleEvent } from 'app/shared/model/schedule-event.model';

describe('Component Tests', () => {
    describe('ScheduleEvent Management Component', () => {
        let comp: ScheduleEventComponent;
        let fixture: ComponentFixture<ScheduleEventComponent>;
        let service: ScheduleEventService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Admin225TestModule],
                declarations: [ScheduleEventComponent],
                providers: []
            })
                .overrideTemplate(ScheduleEventComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ScheduleEventComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScheduleEventService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ScheduleEvent(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.scheduleEvents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
