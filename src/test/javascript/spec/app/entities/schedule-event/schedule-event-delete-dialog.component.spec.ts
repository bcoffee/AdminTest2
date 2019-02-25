/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Admin225TestModule } from '../../../test.module';
import { ScheduleEventDeleteDialogComponent } from 'app/entities/schedule-event/schedule-event-delete-dialog.component';
import { ScheduleEventService } from 'app/entities/schedule-event/schedule-event.service';

describe('Component Tests', () => {
    describe('ScheduleEvent Management Delete Component', () => {
        let comp: ScheduleEventDeleteDialogComponent;
        let fixture: ComponentFixture<ScheduleEventDeleteDialogComponent>;
        let service: ScheduleEventService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Admin225TestModule],
                declarations: [ScheduleEventDeleteDialogComponent]
            })
                .overrideTemplate(ScheduleEventDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ScheduleEventDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScheduleEventService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
