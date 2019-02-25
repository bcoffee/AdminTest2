import { IArticle } from 'app/shared/model/article.model';

export interface IMessageMap {
    id?: number;
    message?: string;
    bit?: number;
    isActive?: boolean;
    ioe?: string;
    cipAddress?: string;
    article?: IArticle;
}

export class MessageMap implements IMessageMap {
    constructor(
        public id?: number,
        public message?: string,
        public bit?: number,
        public isActive?: boolean,
        public ioe?: string,
        public cipAddress?: string,
        public article?: IArticle
    ) {
        this.isActive = this.isActive || false;
    }
}
