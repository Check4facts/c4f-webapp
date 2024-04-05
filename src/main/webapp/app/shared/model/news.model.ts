import { Moment } from 'moment';

export interface INews {
  id?: number;
  title?: string;
  date?: string;
  content?: string;
  previewText?: string;
}

export const defaultValue: Readonly<INews> = {};
