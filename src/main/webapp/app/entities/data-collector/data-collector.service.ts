import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDataCollector } from 'app/shared/model/data-collector.model';

type EntityResponseType = HttpResponse<IDataCollector>;
type EntityArrayResponseType = HttpResponse<IDataCollector[]>;

@Injectable({ providedIn: 'root' })
export class DataCollectorService {
    public resourceUrl = SERVER_API_URL + 'api/data-collectors';

    constructor(protected http: HttpClient) {}

    create(dataCollector: IDataCollector): Observable<EntityResponseType> {
        return this.http.post<IDataCollector>(this.resourceUrl, dataCollector, { observe: 'response' });
    }

    update(dataCollector: IDataCollector): Observable<EntityResponseType> {
        return this.http.put<IDataCollector>(this.resourceUrl, dataCollector, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDataCollector>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDataCollector[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
