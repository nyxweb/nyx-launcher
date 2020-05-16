import { Dispatch } from 'react';
import { IpcRendererEvent } from 'electron';
import { Action, SET_NOTICE, SET_STATE } from '../store/types';

export const commandHandler = (
  _event: IpcRendererEvent,
  data: any,
  dispatch: Dispatch<Action>
) => {
  switch (data.type) {
    case 'initial-load':
      dispatch({ type: SET_STATE, payload: { ...data, loading: false } });
      break;
    case 'notice':
      dispatch({ type: SET_NOTICE, payload: data.notice });
    default:
      break;
  }
};

export const commandSender = (type: string, data: any = null) => {
  global.ipcRenderer.send('command', { type, data });
};
