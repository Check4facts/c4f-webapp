import { IStatement } from 'app/shared/model/statement.model';

export interface ISubTopic {
  id?: number;
  name?: string;
  statements?: IStatement[];
}

export const defaultValue: Readonly<ISubTopic> = {};
