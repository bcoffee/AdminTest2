/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { NonProductionEventService } from 'app/entities/non-production-event/non-production-event.service';
import { INonProductionEvent, NonProductionEvent } from 'app/shared/model/non-production-event.model';

describe('Service Tests', () => {
    describe('NonProductionEvent Service', () => {
        let injector: TestBed;
        let service: NonProductionEventService;
        let httpMock: HttpTestingController;
        let elemDefault: INonProductionEvent;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(NonProductionEventService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new NonProductionEvent(0, 'AAAAAAA', 'AAAAAAA', currentDate, currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        start: currentDate.format(DATE_TIME_FORMAT),
                        end: currentDate.format(DATE_FORMAT)
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

            it('should create a NonProductionEvent', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        start: currentDate.format(DATE_TIME_FORMAT),
                        end: currentDate.format(DATE_FORMAT)
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
                    .create(new NonProductionEvent(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a NonProductionEvent', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        label: 'BBBBBB',
                        start: currentDate.format(DATE_TIME_FORMAT),
                        end: currentDate.format(DATE_FORMAT)
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

            it('should return a list of NonProductionEvent', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        label: 'BBBBBB',
                        start: currentDate.format(DATE_TIME_FORMAT),
                        end: currentDate.format(DATE_FORMAT)
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

            it('should delete a NonProductionEvent', async () => {
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
