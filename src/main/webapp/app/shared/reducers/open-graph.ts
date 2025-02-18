import axios from 'axios';
import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
import { IOpenGraphMetadata } from 'app/shared/model/open-graph-metadata.model';

// Action Types
export const ACTION_TYPES = {
  FETCH_OPENGRAPH_METADATA: 'FETCH_OPENGRAPH_METADATA',
  FETCH_OPENGRAPH_METADATA_FOR_URLS: 'FETCH_OPENGRAPH_METADATA_FOR_URLS',
};

// Initial State
const initialState = {
  loading: false,
  datum: {} as Readonly<IOpenGraphMetadata>,
  data: [] as ReadonlyArray<IOpenGraphMetadata>,
  error: null,
};

export type OpenGraphState = Readonly<typeof initialState>;

// Reducer
export default (state: OpenGraphState = initialState, action): OpenGraphState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_OPENGRAPH_METADATA):
    case REQUEST(ACTION_TYPES.FETCH_OPENGRAPH_METADATA_FOR_URLS):
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FAILURE(ACTION_TYPES.FETCH_OPENGRAPH_METADATA):
    case FAILURE(ACTION_TYPES.FETCH_OPENGRAPH_METADATA_FOR_URLS):
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_OPENGRAPH_METADATA):
      return {
        ...state,
        loading: false,
        datum: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_OPENGRAPH_METADATA_FOR_URLS):
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };
    default:
      return state;
  }
};

// Thunk Action
export const fetchOpenGraphMetadata = (url: string) => ({
  type: ACTION_TYPES.FETCH_OPENGRAPH_METADATA,
  payload: axios.get<IOpenGraphMetadata>(`api/opengraph?url=${encodeURIComponent(url)}`),
});

export const fetchOpenGraphMetadataForUrls = (urls: string[]) => ({
  type: ACTION_TYPES.FETCH_OPENGRAPH_METADATA_FOR_URLS,
  payload: axios.post('api/opengraph/batch', urls),
});
