import { IArticle } from 'app/shared/model/article.model';
import { IModel } from 'app/shared/model/model.model';

export interface IBaseline {
    id?: number;
    cycleLength?: number;
    minTolerance?: number;
    maxTolerance?: number;
    minNormalTolerance?: number;
    maxNormalTolerance?: number;
    article?: IArticle;
    model?: IModel;
}

export class Baseline implements IBaseline {
    constructor(
        public id?: number,
        public cycleLength?: number,
        public minTolerance?: number,
        public maxTolerance?: number,
        public minNormalTolerance?: number,
        public maxNormalTolerance?: number,
        public article?: IArticle,
        public model?: IModel
    ) {}
}
