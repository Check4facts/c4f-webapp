import { IStatementSource } from 'app/shared/model/statement-source.model';
import { ITopic } from 'app/shared/model/topic.model';
import { IArticle } from 'app/shared/model/article.model';

export interface IStatement {
  id?: number;
  text?: any;
  author?: string;
  statementDate?: string;
  publicationDate?: string;
  registrationDate?: string;
  mainArticleTitle?: any;
  mainArticleText?: any;
  mainArticleUrl?: any;
  factCheckerAccuracy?: number;
  statementSources?: IStatementSource[];
  topic?: ITopic;
  subTopics?: string[];
  article?: IArticle;
}

export const defaultValue: Readonly<IStatement> = {
  subTopics: [],
  statementSources: [],
};
