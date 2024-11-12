import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IStatement } from 'app/shared/model/statement.model';
import { ITaskStatus } from 'app/shared/model/util.model';
import { upsertTaskStatus } from 'app/shared/util/entity-utils';
import { ITranslationRequest, ITranslationResponse } from 'app/shared/model/ilsp-tool.model';

export const ACTION_TYPES = {
  SET_FACT: 'fact-checking/SET_FACT',
  ANALYZE_TASK: 'fact-checking/ANALYZE_TASK',
  TRAIN_TASK: 'fact-checking/TRAIN_TASK',
  GET_TASK_STATUS: 'fact-checking/GET_TASK_STATUS',
  REMOVE_TASK_STATUS: 'fact-checking/REMOVE_TASK_STATUS',
  UPDATE_ACTIVE_TASKS: 'fact-checking/UPDATE_ACTIVE_TASKS',
  CHANGE_STATUS_INTERVAL: 'fact-checking/CHANGE_STATUS_INTERVAL',
  RESET: 'fact-checking/RESET',
  TRANSLATE_TEXT: 'fact-checking/TRANSLATE_TEXT',
  GET_RECOMMENDATIONS: 'fact-checking/GET_RECOMMENDATIONS',
  RESET_ILSP_TOOL: 'fact-checking/RESET_ILSP_TOOL',
};

const initialState = {
  statement: '',
  errorMessage: null,
  analyzeLoading: false,
  trainingLoading: false,
  taskStatusLoading: false,
  taskStatuses: [] as ITaskStatus[],
  statusInterval: null,
  ilspTool: {
    translator: {
      data: null as ITranslationResponse,
      loading: false,
      error: null,
    },
    recommender: {
      data: null,
      loading: false,
      error: null,
    },
  },
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
    case REQUEST(ACTION_TYPES.TRANSLATE_TEXT):
      return {
        ...state,
        ilspTool: {
          ...state.ilspTool,
          translator: {
            ...state.ilspTool.translator,
            loading: true,
          },
        },
      };
    case FAILURE(ACTION_TYPES.TRANSLATE_TEXT):
      return {
        ...state,
        ilspTool: {
          ...state.ilspTool,
          translator: {
            ...state.ilspTool.translator,
            loading: false,
            error: action.payload,
          },
        },
      };
    case SUCCESS(ACTION_TYPES.TRANSLATE_TEXT):
      return {
        ...state,
        ilspTool: {
          ...state.ilspTool,
          translator: {
            data: action.payload.data,
            loading: false,
            error: null,
          },
        },
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

export const getTranslation = (text: string) => dispatch => {
  const requestUrl = `http://localhost:5000/translate`;
  const requestPayload = {
    q: text,
    source: 'auto',
    target: 'en',
    format: 'text',
  } as ITranslationRequest;
  return dispatch({
    type: ACTION_TYPES.TRANSLATE_TEXT,
    payload: axios.post(requestUrl, requestPayload),
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
