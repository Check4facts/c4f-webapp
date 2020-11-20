import { IStatement } from 'app/shared/model/statement.model';

export interface IStatementSource {
  id?: any;
  url?: any;
  title?: string;
  snippet?: any;
  statement?: IStatement;
}

export const defaultValue: Readonly<IStatementSource> = {};
