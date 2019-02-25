import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMessageType } from 'app/shared/model/message-type.model';
import { MessageTypeService } from './message-type.service';
import { IMessageMap } from 'app/shared/model/message-map.model';
import { MessageMapService } from 'app/entities/message-map';

@Component({
    selector: 'jhi-message-type-update',
    templateUrl: './message-type-update.component.html'
})
export class MessageTypeUpdateComponent implements OnInit {
    messageType: IMessageType;
    isSaving: boolean;

    messages: IMessageMap[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected messageTypeService: MessageTypeService,
        protected messageMapService: MessageMapService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ messageType }) => {
            this.messageType = messageType;
        });
        this.messageMapService
            .query({ filter: 'messagetype-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IMessageMap[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMessageMap[]>) => response.body)
            )
            .subscribe(
                (res: IMessageMap[]) => {
                    if (!this.messageType.message || !this.messageType.message.id) {
                        this.messages = res;
                    } else {
                        this.messageMapService
                            .find(this.messageType.message.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IMessageMap>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IMessageMap>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IMessageMap) => (this.messages = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.messageType.id !== undefined) {
            this.subscribeToSaveResponse(this.messageTypeService.update(this.messageType));
        } else {
            this.subscribeToSaveResponse(this.messageTypeService.create(this.messageType));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMessageType>>) {
        result.subscribe((res: HttpResponse<IMessageType>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackMessageMapById(index: number, item: IMessageMap) {
        return item.id;
    }
}
