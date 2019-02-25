/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Admin225TestModule } from '../../../test.module';
import { PlcDetailComponent } from 'app/entities/plc/plc-detail.component';
import { Plc } from 'app/shared/model/plc.model';

describe('Component Tests', () => {
    describe('Plc Management Detail Component', () => {
        let comp: PlcDetailComponent;
        let fixture: ComponentFixture<PlcDetailComponent>;
        const route = ({ data: of({ plc: new Plc(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Admin225TestModule],
                declarations: [PlcDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PlcDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PlcDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.plc).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
