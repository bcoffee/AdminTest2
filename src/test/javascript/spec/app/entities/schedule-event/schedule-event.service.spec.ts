/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ScheduleEventService } from 'app/entities/schedule-event/schedule-event.service';
import { IScheduleEvent, ScheduleEvent } from 'app/shared/model/schedule-event.model';

describe('Service Tests', () => {
    describe('ScheduleEvent Service', () => {
        let injector: TestBed;
        let service: ScheduleEventService;
        let httpMock: HttpTestingController;
        let elemDefault: IScheduleEvent;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(ScheduleEventService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new ScheduleEvent(0, 'AAAAAAA', 'AAAAAAA', currentDate, currentDate, false, 0, 0);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        start: currentDate.format(DATE_TIME_FORMAT),
                        end: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a ScheduleEvent', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        start: currentDate.format(DATE_TIME_FORMAT),
                        end: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        start: currentDate,
                        end: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new ScheduleEvent(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a ScheduleEvent', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        label: 'BBBBBB',
                        start: currentDate.format(DATE_TIME_FORMAT),
                        end: currentDate.format(DATE_TIME_FORMAT),
                        planned: true,
                        cycletimeOverride: 1,
                        targetEfficiency: 1
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        start: currentDate,
                        end: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of ScheduleEvent', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        label: 'BBBBBB',
                        start: currentDate.format(DATE_TIME_FORMAT),
                        end: currentDate.format(DATE_TIME_FORMAT),
                        planned: true,
                        cycletimeOverride: 1,
                        targetEfficiency: 1
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        start: currentDate,
                        end: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a ScheduleEvent', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
