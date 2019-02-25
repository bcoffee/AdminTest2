import { IMessageMap } from 'app/shared/model/message-map.model';

export interface IMessageType {
    id?: number;
    code?: string;
    description?: string;
    definition?: string;
    isProductionStop?: boolean;
    message?: IMessageMap;
}

export class MessageType implements IMessageType {
    constructor(
        public id?: number,
        public code?: string,
        public description?: string,
        public definition?: string,
        public isProductionStop?: boolean,
        public message?: IMessageMap
    ) {
        this.isProductionStop = this.isProductionStop || false;
    }
}
