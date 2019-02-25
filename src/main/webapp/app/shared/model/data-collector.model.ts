import { IPlc } from 'app/shared/model/plc.model';
import { IDevice } from 'app/shared/model/device.model';

export interface IDataCollector {
    id?: number;
    ip?: string;
    subnet?: string;
    gateway?: string;
    dns?: string;
    plc?: IPlc;
    devices?: IDevice[];
}

export class DataCollector implements IDataCollector {
    constructor(
        public id?: number,
        public ip?: string,
        public subnet?: string,
        public gateway?: string,
        public dns?: string,
        public plc?: IPlc,
        public devices?: IDevice[]
    ) {}
}
