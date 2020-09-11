import { Moment } from 'moment';

export interface IArticle {
  id?: number;
  previewTitle?: string;
  category?: string;
  previewImageContentType?: string;
  previewImage?: any;
  content?: string;
  articleDate?: string;
  published?: boolean;
}

export const defaultValue: Readonly<IArticle> = {
  published: false,
};
