import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import axios from 'axios';

export const ACTION_TYPES = {
  GENERATE_SUMMARY: 'summarization/GENERATE_SUMMARY',
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
    case REQUEST(ACTION_TYPES.GENERATE_SUMMARY):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.GENERATE_SUMMARY):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.GENERATE_SUMMARY):
      return {
        ...state,
        loading: false,
        summaryTaskId: action.payload.data,
      };
    default:
      return state;
  }
};

// Actions

const pythonUrl = 'http://localhost:9090';
// const testUrl = 'https://check4facts.gr/ml';

export const generateSummary = textToSummarize => (dispatch, getState) => {
  const { inProduction } = getState().applicationProfile;
  const requestUrl = `${inProduction ? '/ml' : pythonUrl}/summarize`;
  return dispatch({
    type: ACTION_TYPES.GENERATE_SUMMARY,
    payload: axios.post(requestUrl, { text: textToSummarize }),
  });
};
