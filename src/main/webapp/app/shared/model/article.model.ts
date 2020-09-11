import { Moment } from 'moment';

export interface IArticle {
  id?: number;
  category?: string;
  content?: string;
  lastModified?: string;
  previewImageContentType?: string;
  previewImage?: any;
  previewTitle?: string;
  published?: boolean;
}

export const defaultValue: Readonly<IArticle> = {
  published: false,
};
