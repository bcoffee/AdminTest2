import { IArticle } from 'app/shared/model/article.model';
import { IAttributeOption } from 'app/shared/model/attribute-option.model';

export interface IAttributeValue {
    id?: number;
    value?: string;
    article?: IArticle;
    option?: IAttributeOption;
}

export class AttributeValue implements IAttributeValue {
    constructor(public id?: number, public value?: string, public article?: IArticle, public option?: IAttributeOption) {}
}
