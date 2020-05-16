import { IConfig } from '../../main/utils/constants';

// Actions
export const SET_LOADING = 'SET_LOADING';
export const SET_STATE = 'SET_STATE';
export const SET_NOTICE = 'SET_NOTICE';
export const SET_CONFIG = 'SET_CONFIG';
export const SET_SERVER = 'SET_SERVER';

// Other

export interface Action {
  type: string;
  payload: any;
}

interface Notice {
  open: boolean;
  type: 'error' | 'warning' | 'info' | 'success';
  message: string;
}

export interface AppState {
  loading: boolean;
  updating: boolean | null;
  notice: Notice | null;
  config: IConfig | null;
  server: boolean | null;
}
