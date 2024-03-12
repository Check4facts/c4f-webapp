import { Moment } from 'moment';

export interface INews {
  id?: number;
  title?: string;
  date?: string;
  content?: string;
}

export const defaultValue: Readonly<INews> = {};
