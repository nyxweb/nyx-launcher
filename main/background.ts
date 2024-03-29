// Native
import { join } from 'path';

// External
import { app, ipcMain, IpcMainEvent } from 'electron';
import serve from 'electron-serve';
import { createWindow, commandHandler } from './utils';

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
    width: 550,
    height: 500,
    frame: false,
    resizable: false,
    backgroundColor: '#000000',
    webPreferences: {
      preload: join(__dirname, '../app/preload.js'),
    },
  });

  if (isProd) {
    await mainWindow.loadURL('app://./index.html');
    // mainWindow.webContents.openDevTools();

    // mainWindow.webContents.on('devtools-opened', () => {
    //   mainWindow.webContents.closeDevTools();
    // });
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}`);
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.on('command', (event: IpcMainEvent, data) => {
  commandHandler(event, data);
});
