/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Admin225TestModule } from '../../../test.module';
import { ArticleTypeDetailComponent } from 'app/entities/article-type/article-type-detail.component';
import { ArticleType } from 'app/shared/model/article-type.model';

describe('Component Tests', () => {
    describe('ArticleType Management Detail Component', () => {
        let comp: ArticleTypeDetailComponent;
        let fixture: ComponentFixture<ArticleTypeDetailComponent>;
        const route = ({ data: of({ articleType: new ArticleType(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Admin225TestModule],
                declarations: [ArticleTypeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ArticleTypeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ArticleTypeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.articleType).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
