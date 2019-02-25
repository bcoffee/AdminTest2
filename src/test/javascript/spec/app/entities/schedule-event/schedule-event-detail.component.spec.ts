/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Admin225TestModule } from '../../../test.module';
import { ScheduleEventDetailComponent } from 'app/entities/schedule-event/schedule-event-detail.component';
import { ScheduleEvent } from 'app/shared/model/schedule-event.model';

describe('Component Tests', () => {
    describe('ScheduleEvent Management Detail Component', () => {
        let comp: ScheduleEventDetailComponent;
        let fixture: ComponentFixture<ScheduleEventDetailComponent>;
        const route = ({ data: of({ scheduleEvent: new ScheduleEvent(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Admin225TestModule],
                declarations: [ScheduleEventDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ScheduleEventDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ScheduleEventDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.scheduleEvent).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
