/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Admin225TestModule } from '../../../test.module';
import { PlcDeleteDialogComponent } from 'app/entities/plc/plc-delete-dialog.component';
import { PlcService } from 'app/entities/plc/plc.service';

describe('Component Tests', () => {
    describe('Plc Management Delete Component', () => {
        let comp: PlcDeleteDialogComponent;
        let fixture: ComponentFixture<PlcDeleteDialogComponent>;
        let service: PlcService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Admin225TestModule],
                declarations: [PlcDeleteDialogComponent]
            })
                .overrideTemplate(PlcDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PlcDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlcService);
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
