/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Admin225TestModule } from '../../../test.module';
import { BaselineComponent } from 'app/entities/baseline/baseline.component';
import { BaselineService } from 'app/entities/baseline/baseline.service';
import { Baseline } from 'app/shared/model/baseline.model';

describe('Component Tests', () => {
    describe('Baseline Management Component', () => {
        let comp: BaselineComponent;
        let fixture: ComponentFixture<BaselineComponent>;
        let service: BaselineService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Admin225TestModule],
                declarations: [BaselineComponent],
                providers: []
            })
                .overrideTemplate(BaselineComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BaselineComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BaselineService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Baseline(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.baselines[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});