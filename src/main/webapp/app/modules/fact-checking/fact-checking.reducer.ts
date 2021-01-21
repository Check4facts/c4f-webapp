import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IStatement } from 'app/shared/model/statement.model';
import { IResource } from 'app/shared/model/resource.model';

export const ACTION_TYPES = {
  SET_FACT: 'fact-checking/SET_FACT',
  SET_URLS: 'fact-checking/SET_URLS',
  SEARCH_HARVEST_STATEMENT: 'fact-checking/SEARCH_HARVEST_STATEMENT',
  TRAIN: 'fact-checking/TRAIN',
  RESET: 'fact-checking/RESET',
};

const initialState = {
  statement: '',
  searchHarvestLoading: false,
  errorMessage: null,
  searchHarvestResponse: null,
  urls: [] as string[],
  training: false,
  trainingLoading: false,
  trainingResponse: null,
};

export type FactCheckingState = Readonly<typeof initialState>;

// Reducer

export default (state: FactCheckingState = initialState, action): FactCheckingState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_HARVEST_STATEMENT):
      return {
        ...state,
        searchHarvestLoading: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_HARVEST_STATEMENT):
      return {
        ...state,
        searchHarvestLoading: false,
        errorMessage: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_HARVEST_STATEMENT):
      return {
        ...state,
        searchHarvestLoading: false,
        searchHarvestResponse: action.payload.data,
      };
    case REQUEST(ACTION_TYPES.TRAIN):
      return {
        ...state,
        trainingLoading: true,
      };
    case FAILURE(ACTION_TYPES.TRAIN):
      return {
        ...state,
        trainingLoading: false,
        errorMessage: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.TRAIN):
      return {
        ...state,
        trainingLoading: false,
        training: true,
        trainingResponse: action.payload.data,
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

export const searchHarvestStatement = (statement: IStatement) => (dispatch, getState) => {
  const { inProduction } = getState().applicationProfile;
  const requestUrl = `${inProduction ? '/ml' : pythonUrl}/analyze`;
  return dispatch({
    type: ACTION_TYPES.SEARCH_HARVEST_STATEMENT,
    payload: axios.post(requestUrl, statement),
  });
};

export const trainModel = () => (dispatch, getState) => {
  const { inProduction } = getState().applicationProfile;
  const requestUrl = `${inProduction ? '/ml' : pythonUrl}/train`;
  return dispatch({
    type: ACTION_TYPES.TRAIN,
    payload: axios.post(requestUrl),
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
