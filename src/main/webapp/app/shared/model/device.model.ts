import { IModel } from 'app/shared/model/model.model';
import { IDataCollector } from 'app/shared/model/data-collector.model';

export interface IDevice {
    id?: number;
    name?: string;
    ip?: string;
    model?: IModel;
    dataCollector?: IDataCollector;
}

export class Device implements IDevice {
    constructor(
        public id?: number,
        public name?: string,
        public ip?: string,
        public model?: IModel,
        public dataCollector?: IDataCollector
    ) {}
}
