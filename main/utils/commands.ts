// INTERNAL
import { execFile } from 'child_process';
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
  const configFile = readConfigFile(app);
  const config = configFile || DEFAULT_CONFIG;
  global.config = config;

  event.sender.send('command', {
    type: 'initial-load',
    config: { ...config, type: !!configFile },
    server: await checkServerStatus(),
  });
};

const startMain = (event: IpcMainEvent, app: App) => {
  const configPath = join(app.getAppPath(), 'main.exe');
  const { host, port } = global.config;

  // '/Applications/Visual Studio Code.app/Contents/MacOS/Electron', ['-g', configPath]
  execFile(configPath, ['connect', `/u${host} /p${port}`], (err) => {
    if (err) {
      event.sender.send('command', {
        type: 'notice',
        notice: {
          open: true,
          type: 'error',
          message: 'Could not find executable main.exe',
        },
      });
    }
  });
};

const checkServerStatus = async () => {
  const { port, host } = global.config;
  const status = await portscanner.checkPortStatus(port, host);
  return status === 'open';
};
