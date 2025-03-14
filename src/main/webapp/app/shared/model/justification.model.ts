import { IStatement } from './statement.model';

export interface IJustification {
  id?: number;
  text?: string;
  label?: string;
  timestamp?: string;
  elapsedTime?: string;
  model?: string;
  sources?: string[];
  statement?: IStatement;
}

export const defaultValue: Readonly<IJustification> = {};
