/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Admin225TestModule } from '../../../test.module';
import { ScheduleEventUpdateComponent } from 'app/entities/schedule-event/schedule-event-update.component';
import { ScheduleEventService } from 'app/entities/schedule-event/schedule-event.service';
import { ScheduleEvent } from 'app/shared/model/schedule-event.model';

describe('Component Tests', () => {
    describe('ScheduleEvent Management Update Component', () => {
        let comp: ScheduleEventUpdateComponent;
        let fixture: ComponentFixture<ScheduleEventUpdateComponent>;
        let service: ScheduleEventService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Admin225TestModule],
                declarations: [ScheduleEventUpdateComponent]
            })
                .overrideTemplate(ScheduleEventUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ScheduleEventUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScheduleEventService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ScheduleEvent(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.scheduleEvent = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ScheduleEvent();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.scheduleEvent = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
