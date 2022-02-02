import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IStatement, defaultValue } from 'app/shared/model/statement.model';

export const ACTION_TYPES = {
  SEARCH_STATEMENTS: 'statement/SEARCH_STATEMENTS',
  FETCH_STATEMENT_LIST: 'statement/FETCH_STATEMENT_LIST',
  FETCH_STATEMENT: 'statement/FETCH_STATEMENT',
  CREATE_STATEMENT: 'statement/CREATE_STATEMENT',
  UPDATE_STATEMENT: 'statement/UPDATE_STATEMENT',
  SET_FACT_CHECKER_ACCURACY: 'statement/SET_FACT_CHECKER_ACCURACY',
  DELETE_STATEMENT: 'statement/DELETE_STATEMENT',
  IMPORT_CSV: 'statement/IMPORT_CSV',
  SET_BLOB: 'statement/SET_BLOB',
  RESET: 'statement/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IStatement>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  rowsUpdated: 0,
  updateSuccess: false,
  importSuccess: null,
};

export type StatementState = Readonly<typeof initialState>;

// Reducer

export default (state: StatementState = initialState, action): StatementState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_STATEMENTS):
    case REQUEST(ACTION_TYPES.FETCH_STATEMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_STATEMENT):
    case REQUEST(ACTION_TYPES.IMPORT_CSV):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_STATEMENT):
    case REQUEST(ACTION_TYPES.UPDATE_STATEMENT):
    case REQUEST(ACTION_TYPES.DELETE_STATEMENT):
    case REQUEST(ACTION_TYPES.SET_FACT_CHECKER_ACCURACY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_STATEMENTS):
    case FAILURE(ACTION_TYPES.FETCH_STATEMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_STATEMENT):
    case FAILURE(ACTION_TYPES.CREATE_STATEMENT):
    case FAILURE(ACTION_TYPES.UPDATE_STATEMENT):
    case FAILURE(ACTION_TYPES.DELETE_STATEMENT):
    case FAILURE(ACTION_TYPES.SET_FACT_CHECKER_ACCURACY):
    case FAILURE(ACTION_TYPES.IMPORT_CSV):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_STATEMENTS):
    case SUCCESS(ACTION_TYPES.FETCH_STATEMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_STATEMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_STATEMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_STATEMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.SET_FACT_CHECKER_ACCURACY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        rowsUpdated: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_STATEMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case SUCCESS(ACTION_TYPES.IMPORT_CSV):
      return {
        ...state,
        loading: false,
        importSuccess: action.payload,
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

const apiUrl = 'api/statements';
const apiSearchUrl = 'api/_search/statements';

// Actions

export const getSearchEntities: ICrudSearchAction<IStatement> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_STATEMENTS,
  payload: axios.get<IStatement>(`${apiSearchUrl}?query=${query}${sort ? `&page=${page}&size=${size}&sort=${sort}` : ''}`),
});

export const getEntities: ICrudGetAllAction<IStatement> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_STATEMENT_LIST,
    payload: axios.get<IStatement>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IStatement> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_STATEMENT,
    payload: axios.get<IStatement>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IStatement> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_STATEMENT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IStatement> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_STATEMENT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const setFactCheckerAccuracy = (id: number, accuracy: number) => {
  return {
    type: ACTION_TYPES.SET_FACT_CHECKER_ACCURACY,
    payload: axios.put(`${apiUrl}/accuracy/${id}/${accuracy}`),
  };
};

export const deleteEntity: ICrudDeleteAction<IStatement> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_STATEMENT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const importFromCSV = file => {
  const formData = new FormData();
  formData.append('file', file);
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  return {
    type: ACTION_TYPES.IMPORT_CSV,
    payload: axios.post(`${apiUrl}/import-csv`, formData, config),
  };
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
