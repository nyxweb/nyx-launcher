export const sendCmd = (type: string, data: any = null) => {
  global.ipcRenderer.send('command', { type, data });
};
