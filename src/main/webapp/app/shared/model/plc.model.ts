export interface IPlc {
    id?: number;
    name?: string;
    ip?: string;
    description?: string;
}

export class Plc implements IPlc {
    constructor(public id?: number, public name?: string, public ip?: string, public description?: string) {}
}
