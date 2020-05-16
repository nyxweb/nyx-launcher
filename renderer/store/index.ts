import { createContext } from 'react';
import { AppState, Action } from './types';

export const initialState = {
  state: {
    loading: true,
    updating: null,
    notice: null,
    config: null,
    server: null,
  },
  dispatch: (_action: Action) => {},
};

const store = createContext<{
  state: AppState;
  dispatch: (action: Action) => void;
}>(initialState);

export default store;
