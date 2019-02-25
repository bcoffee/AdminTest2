import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IScheduleEvent } from 'app/shared/model/schedule-event.model';

type EntityResponseType = HttpResponse<IScheduleEvent>;
type EntityArrayResponseType = HttpResponse<IScheduleEvent[]>;

@Injectable({ providedIn: 'root' })
export class ScheduleEventService {
    public resourceUrl = SERVER_API_URL + 'api/schedule-events';

    constructor(protected http: HttpClient) {}

    create(scheduleEvent: IScheduleEvent): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(scheduleEvent);
        return this.http
            .post<IScheduleEvent>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(scheduleEvent: IScheduleEvent): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(scheduleEvent);
        return this.http
            .put<IScheduleEvent>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IScheduleEvent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IScheduleEvent[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(scheduleEvent: IScheduleEvent): IScheduleEvent {
        const copy: IScheduleEvent = Object.assign({}, scheduleEvent, {
            start: scheduleEvent.start != null && scheduleEvent.start.isValid() ? scheduleEvent.start.toJSON() : null,
            end: scheduleEvent.end != null && scheduleEvent.end.isValid() ? scheduleEvent.end.toJSON() : null
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
            res.body.forEach((scheduleEvent: IScheduleEvent) => {
                scheduleEvent.start = scheduleEvent.start != null ? moment(scheduleEvent.start) : null;
                scheduleEvent.end = scheduleEvent.end != null ? moment(scheduleEvent.end) : null;
            });
        }
        return res;
    }
}
