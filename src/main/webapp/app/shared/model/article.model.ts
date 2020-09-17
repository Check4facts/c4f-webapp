import { Moment } from 'moment';

export interface IArticle {
  id?: number;
  previewTitle?: string;
  category?: string;
  previewImageContentType?: string;
  previewImage?: any;
  articleDate?: string;
  published?: boolean;
  content?: any;
  previewText?: any;
}

export const defaultValue: Readonly<IArticle> = {
  published: false,
};
