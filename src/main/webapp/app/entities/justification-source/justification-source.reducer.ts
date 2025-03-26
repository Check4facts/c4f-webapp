import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IJustificationSource, defaultValue } from 'app/shared/model/justification-source.model';

export const ACTION_TYPES = {
  FETCH_JUSTIFICATIONSOURCE_LIST: 'justificationSource/FETCH_JUSTIFICATIONSOURCE_LIST',
  FETCH_JUSTIFICATIONSOURCE: 'justificationSource/FETCH_JUSTIFICATIONSOURCE',
  CREATE_JUSTIFICATIONSOURCE: 'justificationSource/CREATE_JUSTIFICATIONSOURCE',
  UPDATE_JUSTIFICATIONSOURCE: 'justificationSource/UPDATE_JUSTIFICATIONSOURCE',
  DELETE_JUSTIFICATIONSOURCE: 'justificationSource/DELETE_JUSTIFICATIONSOURCE',
  RESET: 'justificationSource/RESET',
  SAVE_BATCH_JUSTIFICATIONSOURCE: 'justificationSource/SAVE_BATCH_JUSTIFICATIONSOURCE',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IJustificationSource>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type JustificationSourceState = Readonly<typeof initialState>;

// Reducer

export default (state: JustificationSourceState = initialState, action): JustificationSourceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_JUSTIFICATIONSOURCE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_JUSTIFICATIONSOURCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_JUSTIFICATIONSOURCE):
    case REQUEST(ACTION_TYPES.UPDATE_JUSTIFICATIONSOURCE):
    case REQUEST(ACTION_TYPES.DELETE_JUSTIFICATIONSOURCE):
    case REQUEST(ACTION_TYPES.SAVE_BATCH_JUSTIFICATIONSOURCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_JUSTIFICATIONSOURCE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_JUSTIFICATIONSOURCE):
    case FAILURE(ACTION_TYPES.CREATE_JUSTIFICATIONSOURCE):
    case FAILURE(ACTION_TYPES.UPDATE_JUSTIFICATIONSOURCE):
    case FAILURE(ACTION_TYPES.DELETE_JUSTIFICATIONSOURCE):
    case FAILURE(ACTION_TYPES.SAVE_BATCH_JUSTIFICATIONSOURCE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_JUSTIFICATIONSOURCE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_JUSTIFICATIONSOURCE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_JUSTIFICATIONSOURCE):
    case SUCCESS(ACTION_TYPES.UPDATE_JUSTIFICATIONSOURCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_JUSTIFICATIONSOURCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: defaultValue,
      };
    case SUCCESS(ACTION_TYPES.SAVE_BATCH_JUSTIFICATIONSOURCE):
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

export const getEntities: ICrudGetAllAction<IJustificationSource> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_JUSTIFICATIONSOURCE_LIST,
  payload: axios.get<IJustificationSource>(`api/justification-sources?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IJustificationSource> = id => ({
  type: ACTION_TYPES.FETCH_JUSTIFICATIONSOURCE,
  payload: axios.get<IJustificationSource>(`api/justification-sources/${id}`),
});

export const createEntity: ICrudPutAction<IJustificationSource> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_JUSTIFICATIONSOURCE,
    payload: axios.post('api/justification-sources', cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IJustificationSource> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_JUSTIFICATIONSOURCE,
    payload: axios.put(`api/justification-sources/${entity.id}`, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IJustificationSource> = id => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_JUSTIFICATIONSOURCE,
    payload: axios.delete(`api/justification-sources/${id}`),
  });
  dispatch(getEntities());
  return result;
};

export const saveBatch: ICrudPutAction<IJustificationSource[]> = entities => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.SAVE_BATCH_JUSTIFICATIONSOURCE,
    payload: axios.post('api/justification-sources/batch', entities.map(cleanEntity)),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
