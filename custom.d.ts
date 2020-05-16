namespace NodeJS {
  interface Global {
    ipcRenderer: import('electron').IpcRenderer;
    config: import('./main/utils/config').IConfig;
  }
}
