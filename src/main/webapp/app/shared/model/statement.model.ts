import { Moment } from 'moment';
import { IStatementSource } from 'app/shared/model/statement-source.model';
import { IResource } from 'app/shared/model/resource.model';
import { ITopic } from 'app/shared/model/topic.model';

export interface IStatement {
  id?: number;
  text?: any;
  author?: string;
  statementDate?: string;
  registrationDate?: string;
  mainArticleText?: any;
  mainArticleUrl?: any;
  statementSources?: IStatementSource[];
  resources?: IResource[];
  topic?: ITopic;
}

export const defaultValue: Readonly<IStatement> = {};
