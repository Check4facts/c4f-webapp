import { Moment } from 'moment';
import { ICategory } from 'app/shared/model/category.model';
import { IStatement } from 'app/shared/model/statement.model';

export interface IArticle {
  id?: number;
  previewTitle?: any;
  previewImageContentType?: string;
  previewImage?: any;
  imageThumbPreview?: any;
  articleDate?: string;
  articleDateUpdated?: string;
  author?: string;
  published?: boolean;
  content?: any;
  previewText?: any;
  category?: ICategory;
  statement?: IStatement;
}

export const defaultValue: Readonly<IArticle> = {
  published: false,
  previewImage: null,
};
