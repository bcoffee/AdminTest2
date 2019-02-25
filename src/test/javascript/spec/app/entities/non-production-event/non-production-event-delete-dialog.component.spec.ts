/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Admin225TestModule } from '../../../test.module';
import { NonProductionEventDeleteDialogComponent } from 'app/entities/non-production-event/non-production-event-delete-dialog.component';
import { NonProductionEventService } from 'app/entities/non-production-event/non-production-event.service';

describe('Component Tests', () => {
    describe('NonProductionEvent Management Delete Component', () => {
        let comp: NonProductionEventDeleteDialogComponent;
        let fixture: ComponentFixture<NonProductionEventDeleteDialogComponent>;
        let service: NonProductionEventService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Admin225TestModule],
                declarations: [NonProductionEventDeleteDialogComponent]
            })
                .overrideTemplate(NonProductionEventDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NonProductionEventDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NonProductionEventService);
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
