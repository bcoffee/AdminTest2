import { IAttributeOption } from 'app/shared/model/attribute-option.model';
import { IArticleType } from 'app/shared/model/article-type.model';

export const enum AttributeType {
    STRING = 'STRING',
    INTEGER = 'INTEGER',
    BOOLEAN = 'BOOLEAN',
    FLOAT = 'FLOAT',
    DATETIME = 'DATETIME'
}

export interface IAttribute {
    id?: number;
    name?: string;
    description?: string;
    type?: AttributeType;
    isSystem?: boolean;
    nullable?: boolean;
    mutliSelect?: boolean;
    options?: IAttributeOption[];
    articleType?: IArticleType;
}

export class Attribute implements IAttribute {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public type?: AttributeType,
        public isSystem?: boolean,
        public nullable?: boolean,
        public mutliSelect?: boolean,
        public options?: IAttributeOption[],
        public articleType?: IArticleType
    ) {
        this.isSystem = this.isSystem || false;
        this.nullable = this.nullable || false;
        this.mutliSelect = this.mutliSelect || false;
    }
}
