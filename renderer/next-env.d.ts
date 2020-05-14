/// <reference types="next" />
/// <reference types="next/types/global" />

namespace NodeJS {
  interface Global {
    ipcRenderer: import('electron').IpcRenderer;
  }
}
