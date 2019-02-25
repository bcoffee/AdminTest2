/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Admin225TestModule } from '../../../test.module';
import { DataCollectorDeleteDialogComponent } from 'app/entities/data-collector/data-collector-delete-dialog.component';
import { DataCollectorService } from 'app/entities/data-collector/data-collector.service';

describe('Component Tests', () => {
    describe('DataCollector Management Delete Component', () => {
        let comp: DataCollectorDeleteDialogComponent;
        let fixture: ComponentFixture<DataCollectorDeleteDialogComponent>;
        let service: DataCollectorService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Admin225TestModule],
                declarations: [DataCollectorDeleteDialogComponent]
            })
                .overrideTemplate(DataCollectorDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DataCollectorDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataCollectorService);
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
