// INTERNAL
import { execFile } from 'child_process';

// EXTERNAL
import portscanner from 'portscanner';
import { IpcMainEvent } from 'electron';
import { readConfigFile, updateConfigFile } from './config';
import { DEFAULT_CONFIG, IConfig } from './constants';

export const commandHandler = (event: IpcMainEvent, data: any) => {
  switch (data.type) {
    case 'initial-load':
      initialLoad(event);
      break;
    case 'start-main':
      startMain(event);
      break;
    case 'update-config':
      updateConfig(event, data.data);
    default:
      break;
  }
};

const initialLoad = async (event: IpcMainEvent) => {
  const config = readConfigFile() || DEFAULT_CONFIG;
  global.config = config;

  event.sender.send('command', {
    type: 'initial-load',
    config,
    server: await checkServerStatus(),
  });
};

const startMain = (event: IpcMainEvent) => {
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

const updateConfig = (event: IpcMainEvent, config: IConfig) => {
  updateConfigFile(config);
  global.config = { ...global.config, ...config };
};

const checkServerStatus = async () => {
  const { port, host } = global.config;
  const status = await portscanner.checkPortStatus(port, host);
  return status === 'open';
};
