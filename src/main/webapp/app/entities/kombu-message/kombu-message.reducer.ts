import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { ITaskStatus } from 'app/shared/model/util.model';

export const ACTION_TYPES = {
  FETCH_ACTIVE_CELERY_TASKS: 'kombuMessage/FETCH_ACTIVE_CELERY_TASKS',
  RESET: 'kombuMessage/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  activeStatuses: [] as ReadonlyArray<ITaskStatus>,
};

export type KombuMessageState = Readonly<typeof initialState>;

// Reducer

export default (state: KombuMessageState = initialState, action): KombuMessageState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ACTIVE_CELERY_TASKS):
      return {
        ...state,
        errorMessage: null,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_ACTIVE_CELERY_TASKS):
      return {
        ...state,
        errorMessage: action.payload,
        loading: false,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ACTIVE_CELERY_TASKS):
      return {
        ...state,
        loading: false,
        activeStatuses: action.payload.data,
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

export const getActiveCeleryTasks = () => ({
  type: ACTION_TYPES.FETCH_ACTIVE_CELERY_TASKS,
  payload: axios.get<ITaskStatus>(`${apiUrl}/celery-task/active`),
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
