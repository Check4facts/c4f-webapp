import { Moment } from 'moment';
import { ICategory } from 'app/shared/model/category.model';

export interface IArticle {
  id?: number;
  previewTitle?: any;
  previewImageContentType?: string;
  previewImage?: any;
  articleDate?: string;
  published?: boolean;
  content?: any;
  previewText?: any;
  category?: ICategory;
}

export const defaultValue: Readonly<IArticle> = {
  published: false,
};
