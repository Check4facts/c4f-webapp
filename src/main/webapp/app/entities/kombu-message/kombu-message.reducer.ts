import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
  FETCH_KOMBUMESSAGE_LIST: 'kombuMessage/FETCH_KOMBUMESSAGE_LIST',
  FETCH_KOMBUMESSAGE: 'kombuMessage/FETCH_KOMBUMESSAGE',
  FETCH_KOMBUMESSAGE_TASK_ID: 'kombuMessage/FETCH_KOMBUMESSAGE_TASK_ID',
  RESET: 'kombuMessage/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: {},
};

export type KombuMessageState = Readonly<typeof initialState>;

// Reducer

export default (state: KombuMessageState = initialState, action): KombuMessageState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_KOMBUMESSAGE):
    case REQUEST(ACTION_TYPES.FETCH_KOMBUMESSAGE_TASK_ID):
    case REQUEST(ACTION_TYPES.FETCH_KOMBUMESSAGE_LIST):
      return {
        ...state,
        errorMessage: null,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_KOMBUMESSAGE):
    case FAILURE(ACTION_TYPES.FETCH_KOMBUMESSAGE_TASK_ID):
    case FAILURE(ACTION_TYPES.FETCH_KOMBUMESSAGE_LIST):
      return {
        ...state,
        errorMessage: action.payload,
        loading: false,
      };
    case SUCCESS(ACTION_TYPES.FETCH_KOMBUMESSAGE):
    case SUCCESS(ACTION_TYPES.FETCH_KOMBUMESSAGE_TASK_ID):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_KOMBUMESSAGE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/kombu-messages';

// Actions
export const getEntity = id => ({
  type: ACTION_TYPES.FETCH_KOMBUMESSAGE,
  payload: axios.get(`${apiUrl}/${id}`),
});

export const getEntityByTaskId = taskId => ({
  type: ACTION_TYPES.FETCH_KOMBUMESSAGE_TASK_ID,
  payload: axios.get(`${apiUrl}/task_id/${taskId}`),
});

export const getEntities = () => ({
  type: ACTION_TYPES.FETCH_KOMBUMESSAGE_LIST,
  payload: axios.get(apiUrl),
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
