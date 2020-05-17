import { IConfig } from '../../main/utils/constants';

// Actions
export const SET_LOADING = 'SET_LOADING';
export const SET_STATE = 'SET_STATE';
export const SET_CONFIG = 'SET_CONFIG';
export const SET_SERVER = 'SET_SERVER';
export const ADD_NOTICE = 'ADD_NOTICE';
export const REMOVE_NOTICE = 'REMOVE_NOTICE';

// Other

export interface Action {
  type: string;
  payload: any;
}

export interface INotice {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  message: string;
}

export interface AppState {
  loading: boolean;
  updating: boolean | null;
  notices: Array<INotice>;
  config: IConfig | null;
  server: boolean | null;
}
