import { Moment } from 'moment';
import { IStatementSource } from 'app/shared/model/statement-source.model';
import { ITopic } from 'app/shared/model/topic.model';
import { ISubTopic } from 'app/shared/model/sub-topic.model';

export interface IStatement {
  id?: number;
  text?: any;
  author?: string;
  statementDate?: string;
  registrationDate?: string;
  mainArticleText?: any;
  mainArticleUrl?: any;
  factCheckerLabel?: boolean;
  statementSources?: IStatementSource[];
  topic?: ITopic;
  subTopics?: ISubTopic[];
}

export const defaultValue: Readonly<IStatement> = {};
