import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISubTopic, defaultValue } from 'app/shared/model/sub-topic.model';

export const ACTION_TYPES = {
  SEARCH_SUBTOPICS: 'subTopic/SEARCH_SUBTOPICS',
  FETCH_SUBTOPIC_LIST: 'subTopic/FETCH_SUBTOPIC_LIST',
  FETCH_SUBTOPIC_LIST_BY_STATEMENT: 'subTopic/FETCH_SUBTOPIC_LIST_BY_STATEMENT',
  FETCH_SUBTOPIC: 'subTopic/FETCH_SUBTOPIC',
  CREATE_SUBTOPIC: 'subTopic/CREATE_SUBTOPIC',
  UPDATE_SUBTOPIC: 'subTopic/UPDATE_SUBTOPIC',
  DELETE_SUBTOPIC: 'subTopic/DELETE_SUBTOPIC',
  RESET: 'subTopic/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISubTopic>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type SubTopicState = Readonly<typeof initialState>;

// Reducer

export default (state: SubTopicState = initialState, action): SubTopicState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_SUBTOPICS):
    case REQUEST(ACTION_TYPES.FETCH_SUBTOPIC_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SUBTOPIC_LIST_BY_STATEMENT):
    case REQUEST(ACTION_TYPES.FETCH_SUBTOPIC):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_SUBTOPIC):
    case REQUEST(ACTION_TYPES.UPDATE_SUBTOPIC):
    case REQUEST(ACTION_TYPES.DELETE_SUBTOPIC):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_SUBTOPICS):
    case FAILURE(ACTION_TYPES.FETCH_SUBTOPIC_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SUBTOPIC_LIST_BY_STATEMENT):
    case FAILURE(ACTION_TYPES.FETCH_SUBTOPIC):
    case FAILURE(ACTION_TYPES.CREATE_SUBTOPIC):
    case FAILURE(ACTION_TYPES.UPDATE_SUBTOPIC):
    case FAILURE(ACTION_TYPES.DELETE_SUBTOPIC):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_SUBTOPICS):
    case SUCCESS(ACTION_TYPES.FETCH_SUBTOPIC_LIST):
    case SUCCESS(ACTION_TYPES.FETCH_SUBTOPIC_LIST_BY_STATEMENT):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SUBTOPIC):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_SUBTOPIC):
    case SUCCESS(ACTION_TYPES.UPDATE_SUBTOPIC):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_SUBTOPIC):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/sub-topics';
const apiSearchUrl = 'api/_search/sub-topics';

// Actions

export const getSearchEntities: ICrudSearchAction<ISubTopic> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_SUBTOPICS,
  payload: axios.get<ISubTopic>(`${apiSearchUrl}?query=${query}`),
});

export const getEntities: ICrudGetAllAction<ISubTopic> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SUBTOPIC_LIST,
  payload: axios.get<ISubTopic>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getSubTopicsByStatement = statementId => ({
  type: ACTION_TYPES.FETCH_SUBTOPIC_LIST_BY_STATEMENT,
  payload: axios.get<ISubTopic>(`${apiUrl}/statement/${statementId}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ISubTopic> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SUBTOPIC,
    payload: axios.get<ISubTopic>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ISubTopic> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SUBTOPIC,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISubTopic> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SUBTOPIC,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISubTopic> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SUBTOPIC,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
