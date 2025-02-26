import { ITaskStatus } from 'app/shared/model/util.model';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import axios from 'axios';

export const ACTION_TYPES = {
  GENERATE_ARTICLE_SUMMARY: 'summarization/GENERATE_ARTICLE_SUMMARY',
  GENERATION_SUMMARY_STATUS: 'summarization/GENERATION_SUMMARY_STATUS',
  RESET: 'summarization/RESET',
};

const initialState = {
  errorMessage: null,
  loading: false,
  summaryTaskStatus: {} as ITaskStatus,
};

export type SummarizationState = Readonly<typeof initialState>;

// Reducer

export default (state: SummarizationState = initialState, action): SummarizationState => {
  switch (action.type) {
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
        summaryTaskStatus: action.payload.data,
      };
    case REQUEST(ACTION_TYPES.GENERATION_SUMMARY_STATUS):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.GENERATION_SUMMARY_STATUS):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.GENERATION_SUMMARY_STATUS):
      return {
        ...state,
        loading: false,
        summaryTaskStatus: action.payload.data,
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

export const generateArticleSummary = articleId => (dispatch, getState) => {
  const { inProduction } = getState().applicationProfile;
  const requestUrl = `${inProduction ? '/ml' : pythonUrl}/summarize/${articleId}`;
  return dispatch({
    type: ACTION_TYPES.GENERATE_ARTICLE_SUMMARY,
    payload: axios.post(requestUrl),
  });
};

export const getGenerationSummaryStatus = taskId => (dispatch, getState) => {
  const { inProduction } = getState().applicationProfile;
  const requestUrl = `${inProduction ? '/ml' : pythonUrl}/task-status/${taskId}`;
  return dispatch({
    type: ACTION_TYPES.GENERATION_SUMMARY_STATUS,
    payload: axios.get(requestUrl),
  });
};

export const generateAndTrackSummary = articleId => dispatch => {
  return dispatch(generateArticleSummary(articleId))
    .then(result => {
      const taskId = result.value?.data?.taskId; // Extract taskId safely from the response
      if (taskId) {
        return dispatch(getGenerationSummaryStatus(taskId));
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
