import { IDevice } from 'app/shared/model/device.model';

export interface IModel {
    id?: number;
    name?: string;
    priority?: number;
    devices?: IDevice[];
}

export class Model implements IModel {
    constructor(public id?: number, public name?: string, public priority?: number, public devices?: IDevice[]) {}
}
