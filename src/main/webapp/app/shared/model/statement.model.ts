import { Moment } from 'moment';
import { ISubTopic } from 'app/shared/model/sub-topic.model';
import { IStatementSource } from 'app/shared/model/statement-source.model';
import { IResource } from 'app/shared/model/resource.model';

export interface IStatement {
  id?: number;
  text?: any;
  author?: string;
  statementDate?: string;
  registrationDate?: string;
  mainArticleText?: any;
  mainArticleUrl?: any;
  subTopics?: ISubTopic[];
  statementSources?: IStatementSource[];
  resources?: IResource[];
}

export const defaultValue: Readonly<IStatement> = {};
