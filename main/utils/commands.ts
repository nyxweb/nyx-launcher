// INTERNAL
import { execFile, exec } from 'child_process';
import { join } from 'path';
import portscanner from 'portscanner';

// EXTERNAL
import { App, IpcMainEvent } from 'electron';
import { readConfigFile } from './config';
import { DEFAULT_CONFIG } from './constants';

export const commandHandler = (event: IpcMainEvent, data: any, app: App) => {
  switch (data.type) {
    case 'initial-load':
      initialLoad(event, app);
      break;
    case 'start-main':
      startMain(event, app);
      break;
    default:
      break;
  }
};

const initialLoad = async (event: IpcMainEvent, app: App) => {
  const config = readConfigFile() || DEFAULT_CONFIG;
  global.config = config;

  event.sender.send('command', {
    type: 'initial-load',
    config,
    server: await checkServerStatus(),
  });
};

const startMain = (event: IpcMainEvent, app: App) => {
  execFile(
    `main.exe`,
    // [`connect`, `/u${host} /p${port}`],
    { cwd: process.env.PORTABLE_EXECUTABLE_DIR },
    (err) => {
      if (err) {
        event.sender.send('command', {
          type: 'notice',
          notice: {
            type: 'error',
            message: /eacces/i.test(err.message)
              ? 'You need to run the Launcher as Administrator'
              : 'Could not find executable main.exe',
          },
        });
      }
    }
  );
};

const checkServerStatus = async () => {
  const { port, host } = global.config;
  const status = await portscanner.checkPortStatus(port, host);
  return status === 'open';
};
