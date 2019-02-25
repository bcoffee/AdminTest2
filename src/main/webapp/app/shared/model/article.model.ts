import { IArticle } from 'app/shared/model/article.model';
import { IArticleType } from 'app/shared/model/article-type.model';
import { IMessageMap } from 'app/shared/model/message-map.model';
import { IAttributeValue } from 'app/shared/model/attribute-value.model';
import { IBaseline } from 'app/shared/model/baseline.model';
import { IInstallation } from 'app/shared/model/installation.model';

export interface IArticle {
    id?: number;
    name?: string;
    description?: string;
    parent?: IArticle;
    type?: IArticleType;
    messageMaps?: IMessageMap[];
    attributeValues?: IAttributeValue[];
    baselines?: IBaseline[];
    installation?: IInstallation;
}

export class Article implements IArticle {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public parent?: IArticle,
        public type?: IArticleType,
        public messageMaps?: IMessageMap[],
        public attributeValues?: IAttributeValue[],
        public baselines?: IBaseline[],
        public installation?: IInstallation
    ) {}
}
