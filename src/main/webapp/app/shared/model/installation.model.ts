import { ICustomer } from 'app/shared/model/customer.model';

export interface IInstallation {
    id?: number;
    name?: string;
    description?: string;
    streetAddress?: string;
    postalCode?: string;
    city?: string;
    stateProvince?: string;
    timeZone?: string;
    note?: string;
    customer?: ICustomer;
}

export class Installation implements IInstallation {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public streetAddress?: string,
        public postalCode?: string,
        public city?: string,
        public stateProvince?: string,
        public timeZone?: string,
        public note?: string,
        public customer?: ICustomer
    ) {}
}
