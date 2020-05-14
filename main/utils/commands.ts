import { App, IpcMainEvent } from 'electron';
import { execFile, execFileSync, exec } from 'child_process';
import { join } from 'path';

export const commandCenter = (event: IpcMainEvent, data: any, app: App) => {
  switch (data.type) {
    case 'start-main':
      startMain(event, app);
      break;
    case 'mini':

    default:
      break;
  }
};

const startMain = (event: IpcMainEvent, app: App) => {
  const filePath = join(app.getAppPath(), 'nyx.json');

  execFile(filePath, (err) => {
    if (err) {
      event.sender.send('notice', {
        type: 'error',
        message: 'File nyx.json is missing.',
      });
    } else {
      event.sender.send('notice', {
        type: 'success',
        message: 'File nyx.json was successfully opened.',
      });
    }
  });
};
