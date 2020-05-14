import { FC, useEffect, useState, useMemo } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
// import { IpcRendererEvent } from 'electron';
import { createGlobalStyle } from 'styled-components';
import { Context, initialState, AppState } from '../context';
import Structure from '../components/Structure';
import Notice, { INotice } from '../components/ui/Notice';
import { IpcRendererEvent } from 'electron';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [state, setState] = useState<AppState>(initialState);
  const [notice, setNotice] = useState<INotice>({
    open: true,
    type: 'error',
    message: 'Nyx Launcher',
  });

  const appState = useMemo(() => ({ state, setState }), [state, setState]);

  const handleNotice = (event: IpcRendererEvent, data: any) => {
    setNotice(data);
  };

  useEffect(() => {
    global.ipcRenderer.on('notice', handleNotice);

    return () => {
      global.ipcRenderer.off('notice', handleNotice);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotice({ ...notice, open: false });
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [notice]);

  return (
    <Context.Provider value={appState}>
      <Head>
        <title>Nyx Launcher</title>
      </Head>
      <GlobalStyles />
      <Notice notice={notice} />
      <Structure>
        <Component {...pageProps} />
      </Structure>
    </Context.Provider>
  );
};

export default App;

/* Styles */

const GlobalStyles = createGlobalStyle`
  html {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    background: url('/images/background.jpg') no-repeat center center/cover;
    font-size: 13px;
    color: #b2d2db;
  }

  body {
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }
`;
