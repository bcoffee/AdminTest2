/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Admin225TestModule } from '../../../test.module';
import { PlcComponent } from 'app/entities/plc/plc.component';
import { PlcService } from 'app/entities/plc/plc.service';
import { Plc } from 'app/shared/model/plc.model';

describe('Component Tests', () => {
    describe('Plc Management Component', () => {
        let comp: PlcComponent;
        let fixture: ComponentFixture<PlcComponent>;
        let service: PlcService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Admin225TestModule],
                declarations: [PlcComponent],
                providers: []
            })
                .overrideTemplate(PlcComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PlcComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlcService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Plc(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.plcs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
