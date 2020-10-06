export const ACTION_TYPES = {
  SET_FACT: 'fact/SET_FACT',
  SET_URLS: 'fact/SET_URLS',
  SAVE_FACT: 'fact/SAVE_FACT',
  RESET: 'fact/RESET',
};

const initialState = {
  statement: '',
  urls: [] as string[],
};

export type FactCheckingState = Readonly<typeof initialState>;

// Reducer

export default (state: FactCheckingState = initialState, action): FactCheckingState => {
  switch (action.type) {
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
