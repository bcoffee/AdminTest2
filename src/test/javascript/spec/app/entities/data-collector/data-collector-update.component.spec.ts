/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Admin225TestModule } from '../../../test.module';
import { DataCollectorUpdateComponent } from 'app/entities/data-collector/data-collector-update.component';
import { DataCollectorService } from 'app/entities/data-collector/data-collector.service';
import { DataCollector } from 'app/shared/model/data-collector.model';

describe('Component Tests', () => {
    describe('DataCollector Management Update Component', () => {
        let comp: DataCollectorUpdateComponent;
        let fixture: ComponentFixture<DataCollectorUpdateComponent>;
        let service: DataCollectorService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Admin225TestModule],
                declarations: [DataCollectorUpdateComponent]
            })
                .overrideTemplate(DataCollectorUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DataCollectorUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataCollectorService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DataCollector(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.dataCollector = entity;
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
                    const entity = new DataCollector();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.dataCollector = entity;
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
