import { Dispatch } from 'react';
import { IpcRendererEvent } from 'electron';
import { Action, SET_STATE, ADD_NOTICE } from '../store/types';
import { v4 as uuid } from 'uuid';

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
      dispatch({
        type: ADD_NOTICE,
        payload: {
          ...data.notice,
          id: uuid(),
        },
      });
    default:
      break;
  }
};

export const commandSender = (type: string, data: any = null) => {
  global.ipcRenderer.send('command', { type, data });
};
