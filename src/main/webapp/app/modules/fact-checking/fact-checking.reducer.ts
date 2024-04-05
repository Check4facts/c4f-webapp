import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IStatement } from 'app/shared/model/statement.model';
import { ITaskStatus } from 'app/shared/model/util.model';
import { upsertTaskStatus } from 'app/shared/util/entity-utils';

export const ACTION_TYPES = {
  SET_FACT: 'fact-checking/SET_FACT',
  ANALYZE_TASK: 'fact-checking/ANALYZE_TASK',
  TRAIN_TASK: 'fact-checking/TRAIN_TASK',
  GET_TASK_STATUS: 'fact-checking/GET_TASK_STATUS',
  REMOVE_TASK_STATUS: 'fact-checking/REMOVE_TASK_STATUS',
  UPDATE_ACTIVE_TASKS: 'fact-checking/UPDATE_ACTIVE_TASKS',
  CHANGE_STATUS_INTERVAL: 'fact-checking/CHANGE_STATUS_INTERVAL',
  RESET: 'fact-checking/RESET',
};

const initialState = {
  statement: '',
  errorMessage: null,
  analyzeLoading: false,
  trainingLoading: false,
  taskStatusLoading: false,
  taskStatuses: [] as ITaskStatus[],
  statusInterval: null,
};

export type FactCheckingState = Readonly<typeof initialState>;

// Reducer

export default (state: FactCheckingState = initialState, action): FactCheckingState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.ANALYZE_TASK):
      return {
        ...state,
        analyzeLoading: true,
      };
    case FAILURE(ACTION_TYPES.ANALYZE_TASK):
      return {
        ...state,
        analyzeLoading: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.ANALYZE_TASK):
      return {
        ...state,
        analyzeLoading: false,
        taskStatuses: upsertTaskStatus([...state.taskStatuses], action.payload.data),
      };
    case REQUEST(ACTION_TYPES.TRAIN_TASK):
      return {
        ...state,
        trainingLoading: true,
      };
    case FAILURE(ACTION_TYPES.TRAIN_TASK):
      return {
        ...state,
        trainingLoading: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.TRAIN_TASK):
      return {
        ...state,
        trainingLoading: false,
        taskStatuses: upsertTaskStatus([...state.taskStatuses], action.payload.data),
      };
    case REQUEST(ACTION_TYPES.GET_TASK_STATUS):
      return {
        ...state,
        taskStatusLoading: true,
      };
    case FAILURE(ACTION_TYPES.GET_TASK_STATUS):
      return {
        ...state,
        taskStatusLoading: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.GET_TASK_STATUS):
      return {
        ...state,
        taskStatusLoading: false,
        taskStatuses: upsertTaskStatus([...state.taskStatuses], action.payload.data),
      };
    case ACTION_TYPES.REMOVE_TASK_STATUS:
      return {
        ...state,
        taskStatuses: state.taskStatuses.filter(value => value.taskId !== action.payload),
      };
    case ACTION_TYPES.SET_FACT:
      return {
        ...state,
        statement: action.payload,
      };
    case ACTION_TYPES.CHANGE_STATUS_INTERVAL:
      return {
        ...state,
        statusInterval: action.payload,
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

const pythonUrl = 'http://localhost:9090';
// const testUrl = 'https://check4facts.gr/ml';

export const analyzeStatement = (statement: IStatement) => (dispatch, getState) => {
  const { inProduction } = getState().applicationProfile;
  const requestUrl = `${inProduction ? '/ml' : pythonUrl}/analyze`;
  // const requestUrl = `${testUrl}/analyze`;
  return dispatch({
    type: ACTION_TYPES.ANALYZE_TASK,
    payload: axios.post(requestUrl, statement),
  });
};

export const trainModel = () => (dispatch, getState) => {
  const { inProduction } = getState().applicationProfile;
  const requestUrl = `${inProduction ? '/ml' : pythonUrl}/train`;
  // const requestUrl = `${testUrl}/train`;
  return dispatch({
    type: ACTION_TYPES.TRAIN_TASK,
    payload: axios.post(requestUrl),
  });
};

export const getTaskStatus = id => (dispatch, getState) => {
  const { inProduction } = getState().applicationProfile;
  const requestUrl = `${inProduction ? '/ml' : pythonUrl}/task-status/${id}`;
  // const requestUrl = `${testUrl}/task-status/${id}`;
  return dispatch({
    type: ACTION_TYPES.GET_TASK_STATUS,
    payload: axios.get(requestUrl),
  });
};

export const removeTaskStatus = (taskId: string) => ({
  type: ACTION_TYPES.REMOVE_TASK_STATUS,
  payload: taskId,
});

export const changeStatusInterval = interval => ({
  type: ACTION_TYPES.CHANGE_STATUS_INTERVAL,
  payload: interval,
});

export const setFact = (statement: string) => ({
  type: ACTION_TYPES.SET_FACT,
  payload: statement,
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
