/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Admin225TestModule } from '../../../test.module';
import { ArticleTypeUpdateComponent } from 'app/entities/article-type/article-type-update.component';
import { ArticleTypeService } from 'app/entities/article-type/article-type.service';
import { ArticleType } from 'app/shared/model/article-type.model';

describe('Component Tests', () => {
    describe('ArticleType Management Update Component', () => {
        let comp: ArticleTypeUpdateComponent;
        let fixture: ComponentFixture<ArticleTypeUpdateComponent>;
        let service: ArticleTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Admin225TestModule],
                declarations: [ArticleTypeUpdateComponent]
            })
                .overrideTemplate(ArticleTypeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ArticleTypeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ArticleTypeService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ArticleType(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.articleType = entity;
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
                    const entity = new ArticleType();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.articleType = entity;
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
