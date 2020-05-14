import { createContext, Dispatch, SetStateAction } from 'react';

export type AppState = {
  loading: boolean;
  updating: boolean | null;
  version: string | null;
};

export type ProviderState = {
  state: AppState;
  setState: Dispatch<SetStateAction<AppState>>;
};

export const initialState = {
  loading: true,
  updating: null,
  version: null,
};

export const Context = createContext<ProviderState>({
  state: initialState,
  setState: () => {},
});
