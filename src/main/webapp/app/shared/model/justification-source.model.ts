export interface IJustificationSource {
  id?: number;
  url?: string;
  blackListed?: boolean;
  createdAt?: string;
}

export const defaultValue: Readonly<IJustificationSource> = {};
