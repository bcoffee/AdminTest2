/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Admin225TestModule } from '../../../test.module';
import { NonProductionEventDetailComponent } from 'app/entities/non-production-event/non-production-event-detail.component';
import { NonProductionEvent } from 'app/shared/model/non-production-event.model';

describe('Component Tests', () => {
    describe('NonProductionEvent Management Detail Component', () => {
        let comp: NonProductionEventDetailComponent;
        let fixture: ComponentFixture<NonProductionEventDetailComponent>;
        const route = ({ data: of({ nonProductionEvent: new NonProductionEvent(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Admin225TestModule],
                declarations: [NonProductionEventDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(NonProductionEventDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NonProductionEventDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.nonProductionEvent).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
