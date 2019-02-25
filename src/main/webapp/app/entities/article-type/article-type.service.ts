import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IArticleType } from 'app/shared/model/article-type.model';

type EntityResponseType = HttpResponse<IArticleType>;
type EntityArrayResponseType = HttpResponse<IArticleType[]>;

@Injectable({ providedIn: 'root' })
export class ArticleTypeService {
    public resourceUrl = SERVER_API_URL + 'api/article-types';

    constructor(protected http: HttpClient) {}

    create(articleType: IArticleType): Observable<EntityResponseType> {
        return this.http.post<IArticleType>(this.resourceUrl, articleType, { observe: 'response' });
    }

    update(articleType: IArticleType): Observable<EntityResponseType> {
        return this.http.put<IArticleType>(this.resourceUrl, articleType, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IArticleType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IArticleType[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
