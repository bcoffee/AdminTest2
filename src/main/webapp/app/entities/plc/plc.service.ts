import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPlc } from 'app/shared/model/plc.model';

type EntityResponseType = HttpResponse<IPlc>;
type EntityArrayResponseType = HttpResponse<IPlc[]>;

@Injectable({ providedIn: 'root' })
export class PlcService {
    public resourceUrl = SERVER_API_URL + 'api/plcs';

    constructor(protected http: HttpClient) {}

    create(plc: IPlc): Observable<EntityResponseType> {
        return this.http.post<IPlc>(this.resourceUrl, plc, { observe: 'response' });
    }

    update(plc: IPlc): Observable<EntityResponseType> {
        return this.http.put<IPlc>(this.resourceUrl, plc, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPlc>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPlc[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
