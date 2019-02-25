export const enum SystemType {
    PLANT = 'PLANT',
    AREA = 'AREA',
    LINE = 'LINE',
    STATION = 'STATION',
    ASSETS = 'ASSETS',
    GROUP = 'GROUP',
    TAG = 'TAG'
}

export interface IArticleType {
    id?: number;
    name?: string;
    description?: string;
    systemType?: SystemType;
}

export class ArticleType implements IArticleType {
    constructor(public id?: number, public name?: string, public description?: string, public systemType?: SystemType) {}
}
