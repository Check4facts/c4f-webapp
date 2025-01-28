import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import axios from 'axios';

export const ACTION_TYPES = {
  GENERATE_ARTICLE_SUMMARY: 'summarization/GENERATE_ARTICLE_SUMMARY',
};

const initialState = {
  errorMessage: null,
  loading: false,
  summaryTaskId: null,
};

export type SummarizationState = Readonly<typeof initialState>;

// Reducer

export default (state: SummarizationState = initialState, action): SummarizationState => {
  switch (action) {
    case REQUEST(ACTION_TYPES.GENERATE_ARTICLE_SUMMARY):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.GENERATE_ARTICLE_SUMMARY):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.GENERATE_ARTICLE_SUMMARY):
      return {
        ...state,
        loading: false,
        summaryTaskId: action.payload.data.task_id,
      };
    default:
      return state;
  }
};

// Actions

const pythonUrl = 'http://localhost:9090';
// const testUrl = 'https://check4facts.gr/ml';

export const generateArticleSummary = articleId => (dispatch, getState) => {
  const { inProduction } = getState().applicationProfile;
  const requestUrl = `${inProduction ? '/ml' : pythonUrl}/summarize/${articleId}`;
  return dispatch({
    type: ACTION_TYPES.GENERATE_ARTICLE_SUMMARY,
    payload: axios.get(requestUrl),
  });
};
