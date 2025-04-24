import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IJustification, defaultValue } from 'app/shared/model/justification.model';
import { ITaskStatus } from 'app/shared/model/util.model';

export const ACTION_TYPES = {
  FETCH_JUSTIFICATION_LIST: 'justification/FETCH_JUSTIFICATION_LIST',
  FETCH_JUSTIFICATION_LIST_BY_STATEMENT: 'justification/FETCH_JUSTIFICATION_LIST_BY_STATEMENT',
  FETCH_JUSTIFICATION: 'justification/FETCH_JUSTIFICATION',
  FETCH_LATEST_JUSTIFICATION: 'justification/FETCH_LATSET_JUSTIFICATION',
  CREATE_JUSTIFICATION: 'justification/CREATE_JUSTIFICATION',
  UPDATE_JUSTIFICATION: 'justification/UPDATE_JUSTIFICATION',
  DELETE_JUSTIFICATION: 'justification/DELETE_JUSTIFICATION',
  GENERATION_JUSTIFY_STATUS: 'justification/GENERATION_JUSTIFY_STATUS',
  GENERATE_STATEMENT_JUSTIFY: 'justification/GENERATE_STATEMENT_JUSTIFY',
  RESET: 'justification/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IJustification>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
  justifyTaskStatus: {} as ITaskStatus,
};

export type JustificationState = Readonly<typeof initialState>;

// Reducer

export default (state: JustificationState = initialState, action): JustificationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_JUSTIFICATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_JUSTIFICATION_LIST_BY_STATEMENT):
    case REQUEST(ACTION_TYPES.FETCH_JUSTIFICATION):
    case REQUEST(ACTION_TYPES.FETCH_LATEST_JUSTIFICATION):
    case REQUEST(ACTION_TYPES.CREATE_JUSTIFICATION):
    case REQUEST(ACTION_TYPES.UPDATE_JUSTIFICATION):
    case REQUEST(ACTION_TYPES.DELETE_JUSTIFICATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case REQUEST(ACTION_TYPES.GENERATE_STATEMENT_JUSTIFY):
      return {
        ...state,
        errorMessage: null,
      };
    case FAILURE(ACTION_TYPES.GENERATE_STATEMENT_JUSTIFY):
    case FAILURE(ACTION_TYPES.GENERATION_JUSTIFY_STATUS):
    case FAILURE(ACTION_TYPES.FETCH_JUSTIFICATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_JUSTIFICATION_LIST_BY_STATEMENT):
    case FAILURE(ACTION_TYPES.FETCH_JUSTIFICATION):
    case FAILURE(ACTION_TYPES.FETCH_LATEST_JUSTIFICATION):
    case FAILURE(ACTION_TYPES.CREATE_JUSTIFICATION):
    case FAILURE(ACTION_TYPES.UPDATE_JUSTIFICATION):
    case FAILURE(ACTION_TYPES.DELETE_JUSTIFICATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_JUSTIFICATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_JUSTIFICATION_LIST_BY_STATEMENT):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_JUSTIFICATION):
    case SUCCESS(ACTION_TYPES.FETCH_LATEST_JUSTIFICATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_JUSTIFICATION):
    case SUCCESS(ACTION_TYPES.UPDATE_JUSTIFICATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_JUSTIFICATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case SUCCESS(ACTION_TYPES.GENERATE_STATEMENT_JUSTIFY):
    case SUCCESS(ACTION_TYPES.GENERATION_JUSTIFY_STATUS):
      return {
        ...state,
        justifyTaskStatus: action.payload.data,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/justification';
const pythonUrl = 'http://localhost:9090';

// Actions

export const getEntities: ICrudGetAllAction<IJustification> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_JUSTIFICATION_LIST,
    payload: axios.get<IJustification>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getJustificationsByStatement = statementId => {
  const requestUrl = `${apiUrl}/statement/${statementId}`;
  return {
    type: ACTION_TYPES.FETCH_JUSTIFICATION_LIST_BY_STATEMENT,
    payload: axios.get<IJustification[]>(requestUrl),
  };
};

export const getEntity: ICrudGetAction<IJustification> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_JUSTIFICATION,
    payload: axios.get<IJustification>(requestUrl),
  };
};

export const getLatestJustification: ICrudGetAction<IJustification> = statementId => {
  const requestUrl = `${apiUrl}/latest/${statementId}`;
  return {
    type: ACTION_TYPES.FETCH_LATEST_JUSTIFICATION,
    payload: axios.get<IJustification>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IJustification> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_JUSTIFICATION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IJustification> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_JUSTIFICATION,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IJustification> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_JUSTIFICATION,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const generateStatementJustify = (statementId, n) => (dispatch, getState) => {
  const { inProduction } = getState().applicationProfile;
  const requestUrl = `${inProduction ? '/ml' : pythonUrl}/justify`;
  return dispatch({
    type: ACTION_TYPES.GENERATE_STATEMENT_JUSTIFY,
    payload: axios.post(requestUrl, { id: statementId, n }),
  });
};

export const getGenerationJustifyStatus = taskId => (dispatch, getState) => {
  const { inProduction } = getState().applicationProfile;
  const requestUrl = `${inProduction ? '/ml' : pythonUrl}/task-status/${taskId}`;
  return dispatch({
    type: ACTION_TYPES.GENERATION_JUSTIFY_STATUS,
    payload: axios.get(requestUrl),
  });
};

export const generateAndTrackJustify = (statementId, n) => dispatch => {
  return dispatch(generateStatementJustify(statementId, n))
    .then(result => {
      const taskId = result.value?.data?.taskId; // Extract taskId safely from the response
      if (taskId) {
        return dispatch(getGenerationJustifyStatus(taskId));
      }
      throw new Error('Task ID not found in the response.');
    })
    .catch(error => {
      console.error('Error during generateAndTrackSummary:', error);
    });
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
