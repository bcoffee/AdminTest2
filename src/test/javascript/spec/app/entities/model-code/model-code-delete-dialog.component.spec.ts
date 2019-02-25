/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Admin225TestModule } from '../../../test.module';
import { ModelCodeDeleteDialogComponent } from 'app/entities/model-code/model-code-delete-dialog.component';
import { ModelCodeService } from 'app/entities/model-code/model-code.service';

describe('Component Tests', () => {
    describe('ModelCode Management Delete Component', () => {
        let comp: ModelCodeDeleteDialogComponent;
        let fixture: ComponentFixture<ModelCodeDeleteDialogComponent>;
        let service: ModelCodeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Admin225TestModule],
                declarations: [ModelCodeDeleteDialogComponent]
            })
                .overrideTemplate(ModelCodeDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ModelCodeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ModelCodeService);
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