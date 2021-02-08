import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFeatureStatement, defaultValue } from 'app/shared/model/feature-statement.model';

export const ACTION_TYPES = {
  SEARCH_FEATURESTATEMENTS: 'featureStatement/SEARCH_FEATURESTATEMENTS',
  FETCH_FEATURESTATEMENT_LIST: 'featureStatement/FETCH_FEATURESTATEMENT_LIST',
  FETCH_FEATURESTATEMENT_LIST_BY_STATEMENT: 'featureStatement/FETCH_FEATURESTATEMENT_LIST_BY_STATEMENT',
  COUNT_FEATURESTATEMENT_LIST_BY_STATEMENT: 'featureStatement/COUNT_FEATURESTATEMENT_LIST_BY_STATEMENT',
  FETCH_FEATURESTATEMENT: 'featureStatement/FETCH_FEATURESTATEMENT',
  FETCH_LATEST_FEATURESTATEMENT_BY_STATEMENT: 'featureStatement/FETCH_LATEST_FEATURESTATEMENT_BY_STATEMENT',
  SET_TRUE_LABEL_FEATURESTATMENT: 'featureStatement/SET_TRUE_LABEL_FEATURESTATMENT',
  RESET: 'featureStatement/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFeatureStatement>,
  entity: defaultValue,
  rowsUpdated: 0,
  count: 0,
};

export type FeatureStatementState = Readonly<typeof initialState>;

// Reducer

export default (state: FeatureStatementState = initialState, action): FeatureStatementState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_FEATURESTATEMENTS):
    case REQUEST(ACTION_TYPES.FETCH_FEATURESTATEMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FEATURESTATEMENT_LIST_BY_STATEMENT):
    case REQUEST(ACTION_TYPES.COUNT_FEATURESTATEMENT_LIST_BY_STATEMENT):
    case REQUEST(ACTION_TYPES.FETCH_FEATURESTATEMENT):
    case REQUEST(ACTION_TYPES.FETCH_LATEST_FEATURESTATEMENT_BY_STATEMENT):
    case REQUEST(ACTION_TYPES.SET_TRUE_LABEL_FEATURESTATMENT):
      return {
        ...state,
        errorMessage: null,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_FEATURESTATEMENTS):
    case FAILURE(ACTION_TYPES.FETCH_FEATURESTATEMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FEATURESTATEMENT_LIST_BY_STATEMENT):
    case FAILURE(ACTION_TYPES.COUNT_FEATURESTATEMENT_LIST_BY_STATEMENT):
    case FAILURE(ACTION_TYPES.FETCH_FEATURESTATEMENT):
    case FAILURE(ACTION_TYPES.FETCH_LATEST_FEATURESTATEMENT_BY_STATEMENT):
    case FAILURE(ACTION_TYPES.SET_TRUE_LABEL_FEATURESTATMENT):
      return {
        ...state,
        errorMessage: action.payload,
        loading: false,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_FEATURESTATEMENTS):
    case SUCCESS(ACTION_TYPES.FETCH_FEATURESTATEMENT_LIST):
    case SUCCESS(ACTION_TYPES.FETCH_FEATURESTATEMENT_LIST_BY_STATEMENT):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_FEATURESTATEMENT):
    case SUCCESS(ACTION_TYPES.FETCH_LATEST_FEATURESTATEMENT_BY_STATEMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.SET_TRUE_LABEL_FEATURESTATMENT):
      return {
        ...state,
        loading: false,
        rowsUpdated: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.COUNT_FEATURESTATEMENT_LIST_BY_STATEMENT):
      return {
        ...state,
        loading: false,
        count: action.payload.data,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/feature-statements';
const apiSearchUrl = 'api/_search/feature-statements';

// Actions

export const getSearchEntities: ICrudSearchAction<IFeatureStatement> = query => ({
  type: ACTION_TYPES.SEARCH_FEATURESTATEMENTS,
  payload: axios.get<IFeatureStatement>(`${apiSearchUrl}?query=${query}`),
});

export const getEntities: ICrudGetAllAction<IFeatureStatement> = () => ({
  type: ACTION_TYPES.FETCH_FEATURESTATEMENT_LIST,
  payload: axios.get<IFeatureStatement>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getFeatureStatementsByStatement: ICrudGetAllAction<IFeatureStatement> = statementId => ({
  type: ACTION_TYPES.FETCH_FEATURESTATEMENT_LIST_BY_STATEMENT,
  payload: axios.get<IFeatureStatement>(`${apiUrl}/statement/${statementId}?cacheBuster=${new Date().getTime()}`),
});

export const countFeatureStatementsByStatement = statementId => ({
  type: ACTION_TYPES.COUNT_FEATURESTATEMENT_LIST_BY_STATEMENT,
  payload: axios.get<IFeatureStatement>(`${apiUrl}/count/statement/${statementId}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IFeatureStatement> = id => ({
  type: ACTION_TYPES.FETCH_FEATURESTATEMENT,
  payload: axios.get<IFeatureStatement>(`${apiUrl}/${id}`),
});

export const getLatestFeatureStatementByStatementId: ICrudGetAction<IFeatureStatement> = statementId => ({
  type: ACTION_TYPES.FETCH_LATEST_FEATURESTATEMENT_BY_STATEMENT,
  payload: axios.get<IFeatureStatement>(`${apiUrl}/latest/statement/${statementId}`),
});

export const setTrueLabel = (id: number, label: boolean) => {
  return {
    type: ACTION_TYPES.SET_TRUE_LABEL_FEATURESTATMENT,
    payload: axios.put(`${apiUrl}/${id}/${label}`),
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
