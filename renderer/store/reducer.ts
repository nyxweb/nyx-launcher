import {
  Action,
  AppState,
  SET_STATE,
  SET_LOADING,
  SET_NOTICE,
  SET_CONFIG,
  SET_SERVER,
} from './types';

const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case SET_STATE:
      return { ...state, ...action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_NOTICE:
      return { ...state, notice: action.payload };
    case SET_CONFIG:
      return { ...state, config: action.payload };
    case SET_SERVER:
      return { ...state, server: action.payload };
    default:
      return state;
  }
};

export default reducer;
