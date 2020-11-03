import { Moment } from 'moment';
import { IStatement } from 'app/shared/model/statement.model';
import { FileFormat } from 'app/shared/model/enumerations/file-format.model';

export interface IResource {
  id?: number;
  url?: any;
  harvestIteration?: number;
  title?: any;
  simSentence?: any;
  simParagraph?: any;
  fileFormat?: FileFormat;
  body?: any;
  harvestDate?: string;
  statement?: IStatement;
}

export const defaultValue: Readonly<IResource> = {};
