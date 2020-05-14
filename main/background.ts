// Native
import { execFile } from 'child_process';
import { join } from 'path';
import fs from 'fs';

// External
import { app, ipcMain, IpcMainEvent } from 'electron';
import serve from 'electron-serve';
import { createWindow, validateConfig, commandCenter } from './utils';

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();
  app.allowRendererProcessReuse = true;

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 700,
    frame: false,
    resizable: false,
    webPreferences: {
      preload: join(__dirname, '../app/preload.js'),
    },
  });

  if (isProd) {
    await mainWindow.loadURL('app://./index.html');

    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools();
    });
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}`);
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.on('command', (event: IpcMainEvent, data) => {
  commandCenter(event, data, app);
});

ipcMain.on('startGame', (event: IpcMainEvent) => {
  execFile(
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    (err) => {
      if (err) {
        event.sender.send('notice', 'Woops error', err.message);
      } else {
        event.sender.send('notice', 'Success');
      }
    }
  );
});

ipcMain.on('check-update', (event: IpcMainEvent) => {
  const filePath = join(app.getAppPath(), 'nyx.json');
  const defaultConfig = {
    version: '0.0.1',
    windowMode: true,
    resolution: '1920x1080',
  };
  let config;

  const createConfig = () => {
    fs.writeFileSync(filePath, JSON.stringify(defaultConfig, null, 2));
  };

  try {
    const fileContents = fs.readFileSync(filePath, { encoding: 'utf8' });
    config = JSON.parse(fileContents);

    if (!validateConfig(config)) {
      config = defaultConfig;
      createConfig();
    }
  } catch (error) {
    config = defaultConfig;
    createConfig();
  }
});
