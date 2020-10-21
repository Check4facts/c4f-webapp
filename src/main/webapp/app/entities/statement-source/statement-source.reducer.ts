import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IStatementSource, defaultValue } from 'app/shared/model/statement-source.model';

export const ACTION_TYPES = {
  SEARCH_STATEMENTSOURCES: 'statementSource/SEARCH_STATEMENTSOURCES',
  FETCH_STATEMENTSOURCE_LIST: 'statementSource/FETCH_STATEMENTSOURCE_LIST',
  FETCH_STATEMENTSOURCE: 'statementSource/FETCH_STATEMENTSOURCE',
  CREATE_STATEMENTSOURCE: 'statementSource/CREATE_STATEMENTSOURCE',
  UPDATE_STATEMENTSOURCE: 'statementSource/UPDATE_STATEMENTSOURCE',
  DELETE_STATEMENTSOURCE: 'statementSource/DELETE_STATEMENTSOURCE',
  SET_BLOB: 'statementSource/SET_BLOB',
  RESET: 'statementSource/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IStatementSource>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type StatementSourceState = Readonly<typeof initialState>;

// Reducer

export default (state: StatementSourceState = initialState, action): StatementSourceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_STATEMENTSOURCES):
    case REQUEST(ACTION_TYPES.FETCH_STATEMENTSOURCE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_STATEMENTSOURCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_STATEMENTSOURCE):
    case REQUEST(ACTION_TYPES.UPDATE_STATEMENTSOURCE):
    case REQUEST(ACTION_TYPES.DELETE_STATEMENTSOURCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_STATEMENTSOURCES):
    case FAILURE(ACTION_TYPES.FETCH_STATEMENTSOURCE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_STATEMENTSOURCE):
    case FAILURE(ACTION_TYPES.CREATE_STATEMENTSOURCE):
    case FAILURE(ACTION_TYPES.UPDATE_STATEMENTSOURCE):
    case FAILURE(ACTION_TYPES.DELETE_STATEMENTSOURCE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_STATEMENTSOURCES):
    case SUCCESS(ACTION_TYPES.FETCH_STATEMENTSOURCE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_STATEMENTSOURCE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_STATEMENTSOURCE):
    case SUCCESS(ACTION_TYPES.UPDATE_STATEMENTSOURCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_STATEMENTSOURCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType,
        },
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/statement-sources';
const apiSearchUrl = 'api/_search/statement-sources';

// Actions

export const getSearchEntities: ICrudSearchAction<IStatementSource> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_STATEMENTSOURCES,
  payload: axios.get<IStatementSource>(`${apiSearchUrl}?query=${query}`),
});

export const getEntities: ICrudGetAllAction<IStatementSource> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_STATEMENTSOURCE_LIST,
  payload: axios.get<IStatementSource>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IStatementSource> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_STATEMENTSOURCE,
    payload: axios.get<IStatementSource>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IStatementSource> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_STATEMENTSOURCE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IStatementSource> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_STATEMENTSOURCE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IStatementSource> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_STATEMENTSOURCE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
