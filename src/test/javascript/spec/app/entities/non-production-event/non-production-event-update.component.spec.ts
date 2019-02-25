/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Admin225TestModule } from '../../../test.module';
import { NonProductionEventUpdateComponent } from 'app/entities/non-production-event/non-production-event-update.component';
import { NonProductionEventService } from 'app/entities/non-production-event/non-production-event.service';
import { NonProductionEvent } from 'app/shared/model/non-production-event.model';

describe('Component Tests', () => {
    describe('NonProductionEvent Management Update Component', () => {
        let comp: NonProductionEventUpdateComponent;
        let fixture: ComponentFixture<NonProductionEventUpdateComponent>;
        let service: NonProductionEventService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Admin225TestModule],
                declarations: [NonProductionEventUpdateComponent]
            })
                .overrideTemplate(NonProductionEventUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NonProductionEventUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NonProductionEventService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new NonProductionEvent(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.nonProductionEvent = entity;
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
                    const entity = new NonProductionEvent();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.nonProductionEvent = entity;
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
