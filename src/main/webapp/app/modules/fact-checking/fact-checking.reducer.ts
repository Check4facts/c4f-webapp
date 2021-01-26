import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IStatement } from 'app/shared/model/statement.model';

export const ACTION_TYPES = {
  SET_FACT: 'fact-checking/SET_FACT',
  SET_URLS: 'fact-checking/SET_URLS',
  ANALYZE_TASK: 'fact-checking/ANALYZE_TASK',
  TRAIN_TASK: 'fact-checking/TRAIN_TASK',
  GET_ACTIVE_TASKS: 'fact-checking/GET_ACTIVE_TASKS',
  GET_TASK_STATUS: 'fact-checking/GET_TASK_STATUS',
  RESET: 'fact-checking/RESET',
};

const initialState = {
  statement: '',
  errorMessage: null,
  urls: [] as string[],
  training: false,
  analyzeLoading: false,
  trainingLoading: false,
  taskStatusLoading: false,
  activeTasks: [] as string[],
  activeTasksLoading: false,
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
        activeTasks: [...state.activeTasks, action.payload.data.taskId],
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
        training: true,
        activeTasks: [...state.activeTasks, action.payload.data.taskId],
      };
    case REQUEST(ACTION_TYPES.GET_ACTIVE_TASKS):
      return {
        ...state,
        activeTasksLoading: true,
      };
    case FAILURE(ACTION_TYPES.GET_ACTIVE_TASKS):
      return {
        ...state,
        activeTasksLoading: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.GET_ACTIVE_TASKS):
      return {
        ...state,
        activeTasksLoading: false,
        activeTasks: action.payload,
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
      };
    case ACTION_TYPES.SET_FACT:
      return {
        ...state,
        statement: action.payload,
      };
    case ACTION_TYPES.SET_URLS:
      return {
        ...state,
        urls: action.payload,
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

export const analyzeStatement = (statement: IStatement) => (dispatch, getState) => {
  const { inProduction } = getState().applicationProfile;
  const requestUrl = `${inProduction ? '/ml' : pythonUrl}/analyze`;
  return dispatch({
    type: ACTION_TYPES.ANALYZE_TASK,
    payload: axios.post(requestUrl, statement),
  });
};

export const trainModel = () => (dispatch, getState) => {
  const { inProduction } = getState().applicationProfile;
  const requestUrl = `${inProduction ? '/ml' : pythonUrl}/train`;
  return dispatch({
    type: ACTION_TYPES.TRAIN_TASK,
    payload: axios.post(requestUrl),
  });
};

export const getActiveTasks = () => (dispatch, getState) => {};

export const getTaskStatus = id => (dispatch, getState) => {
  const { inProduction } = getState().applicationProfile;
  const requestUrl = `${inProduction ? '/ml' : pythonUrl}/task-status/${id}`;
  return dispatch({
    type: ACTION_TYPES.GET_TASK_STATUS,
    payload: axios.get(requestUrl),
  });
};

export const setFact = (statement: string) => ({
  type: ACTION_TYPES.SET_FACT,
  payload: statement,
});

export const setURLs = (urls: string[]) => ({
  type: ACTION_TYPES.SET_URLS,
  payload: urls,
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
