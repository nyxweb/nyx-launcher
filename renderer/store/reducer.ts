import {
  Action,
  AppState,
  SET_STATE,
  SET_LOADING,
  SET_CONFIG,
  SET_SERVER,
  ADD_NOTICE,
  REMOVE_NOTICE,
} from './types';

const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case SET_STATE:
      return { ...state, ...action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_CONFIG:
      return { ...state, config: action.payload };
    case SET_SERVER:
      return { ...state, server: action.payload };
    case ADD_NOTICE:
      const list = [...state.notices];
      if (state.notices.length >= 3) list.shift();
      return { ...state, notices: [...list, action.payload] };
    case REMOVE_NOTICE:
      const updated = [...state.notices];
      const index = updated.findIndex((n) => n.id === action.payload);
      updated.splice(index, 1);
      return { ...state, notices: updated };
    default:
      return state;
  }
};

export default reducer;
