/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Admin225TestModule } from '../../../test.module';
import { PlcUpdateComponent } from 'app/entities/plc/plc-update.component';
import { PlcService } from 'app/entities/plc/plc.service';
import { Plc } from 'app/shared/model/plc.model';

describe('Component Tests', () => {
    describe('Plc Management Update Component', () => {
        let comp: PlcUpdateComponent;
        let fixture: ComponentFixture<PlcUpdateComponent>;
        let service: PlcService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Admin225TestModule],
                declarations: [PlcUpdateComponent]
            })
                .overrideTemplate(PlcUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PlcUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlcService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Plc(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.plc = entity;
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
                    const entity = new Plc();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.plc = entity;
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
