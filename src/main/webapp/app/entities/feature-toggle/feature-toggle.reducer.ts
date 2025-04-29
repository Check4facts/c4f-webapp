import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFeatureToggle, defaultValue } from 'app/shared/model/feature-toggle.model';

export const ACTION_TYPES = {
  FETCH_FEATURE_TOGGLE_LIST: 'featureToggle/FETCH_FEATURE_TOGGLES_LIST',
  FETCH_FEATURE_TOGGLE: 'featureToggle/FETCH_FEATURE_TOGGLE',
  CREATE_FEATURE_TOGGLE: 'featureToggle/CREATE_FEATURE_TOGGLE',
  UPDATE_FEATURE_TOGGLE: 'featureToggle/UPDATE_FEATURE_TOGGLE',
  DELETE_FEATURE_TOGGLE: 'featureToggle/DELETE_FEATURE_TOGGLE',
  RESET: 'featureToggle/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFeatureToggle>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type FeatureToggleState = Readonly<typeof initialState>;

// Reducer

export default (state: FeatureToggleState = initialState, action): FeatureToggleState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FEATURE_TOGGLE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FEATURE_TOGGLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_FEATURE_TOGGLE):
    case REQUEST(ACTION_TYPES.UPDATE_FEATURE_TOGGLE):
    case REQUEST(ACTION_TYPES.DELETE_FEATURE_TOGGLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_FEATURE_TOGGLE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FEATURE_TOGGLE):
    case FAILURE(ACTION_TYPES.CREATE_FEATURE_TOGGLE):
    case FAILURE(ACTION_TYPES.UPDATE_FEATURE_TOGGLE):
    case FAILURE(ACTION_TYPES.DELETE_FEATURE_TOGGLE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload.message,
      };
    case SUCCESS(ACTION_TYPES.FETCH_FEATURE_TOGGLE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_FEATURE_TOGGLE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_FEATURE_TOGGLE):
    case SUCCESS(ACTION_TYPES.UPDATE_FEATURE_TOGGLE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_FEATURE_TOGGLE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

// Actions

const apiUrl = 'api/feature-toggles';

export const getEntities: ICrudGetAllAction<IFeatureToggle> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FEATURE_TOGGLE_LIST,
  payload: axios.get<IFeatureToggle>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IFeatureToggle> = key => ({
  type: ACTION_TYPES.FETCH_FEATURE_TOGGLE,
  payload: axios.get<IFeatureToggle>(`${apiUrl}/${key}`),
});

export const createEntity: ICrudPutAction<IFeatureToggle> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FEATURE_TOGGLE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFeatureToggle> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FEATURE_TOGGLE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFeatureToggle> = key => async dispatch => {
  const requestUrl = `${apiUrl}/${key}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FEATURE_TOGGLE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
