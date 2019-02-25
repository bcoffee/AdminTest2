import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INonProductionEvent } from 'app/shared/model/non-production-event.model';

type EntityResponseType = HttpResponse<INonProductionEvent>;
type EntityArrayResponseType = HttpResponse<INonProductionEvent[]>;

@Injectable({ providedIn: 'root' })
export class NonProductionEventService {
    public resourceUrl = SERVER_API_URL + 'api/non-production-events';

    constructor(protected http: HttpClient) {}

    create(nonProductionEvent: INonProductionEvent): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(nonProductionEvent);
        return this.http
            .post<INonProductionEvent>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(nonProductionEvent: INonProductionEvent): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(nonProductionEvent);
        return this.http
            .put<INonProductionEvent>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<INonProductionEvent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<INonProductionEvent[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(nonProductionEvent: INonProductionEvent): INonProductionEvent {
        const copy: INonProductionEvent = Object.assign({}, nonProductionEvent, {
            start: nonProductionEvent.start != null && nonProductionEvent.start.isValid() ? nonProductionEvent.start.toJSON() : null,
            end: nonProductionEvent.end != null && nonProductionEvent.end.isValid() ? nonProductionEvent.end.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.start = res.body.start != null ? moment(res.body.start) : null;
            res.body.end = res.body.end != null ? moment(res.body.end) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((nonProductionEvent: INonProductionEvent) => {
                nonProductionEvent.start = nonProductionEvent.start != null ? moment(nonProductionEvent.start) : null;
                nonProductionEvent.end = nonProductionEvent.end != null ? moment(nonProductionEvent.end) : null;
            });
        }
        return res;
    }
}
