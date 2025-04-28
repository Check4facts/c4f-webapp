export interface IFeatureToggle {
  key?: string;
  enabled?: boolean;
}

export const defaultValue: Readonly<IFeatureToggle> = {};
