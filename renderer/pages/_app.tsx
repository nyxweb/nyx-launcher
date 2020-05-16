import { FC, useEffect, useReducer, useMemo, useCallback } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { createGlobalStyle } from 'styled-components';
import Store, { initialState } from '../store';
import Reducer from '../store/reducer';
import { commandHandler, commandSender } from '../utils/commands';

import Structure from '../components/Structure';
import Notice from '../components/ui/Notice';
import AppLoader from '../components/ui/AppLoader';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [appState, appDispatch] = useReducer(Reducer, initialState.state);

  const state = useMemo(() => appState, [appState]);
  const dispatch = useCallback(appDispatch, [appDispatch]);

  useEffect(() => {
    commandSender('initial-load');

    global.ipcRenderer.on('command', (event, data) =>
      commandHandler(event, data, dispatch)
    );

    return () => {
      global.ipcRenderer.off('command', (event, data) =>
        commandHandler(event, data, dispatch)
      );
    };
  }, []);

  return (
    <Store.Provider value={{ state, dispatch }}>
      <Head>
        <title>Nyx Launcher</title>
      </Head>
      <GlobalStyles />
      <AppLoader loading={state.loading} />
      <Notice />
      {!state.loading && (
        <Structure>
          <Component {...pageProps} />
        </Structure>
      )}
    </Store.Provider>
  );
};

export default App;

/* Styles */

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: Roboto;
    src: url('/fonts/Roboto-Light.ttf');
  }

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
    font-family: Roboto, Calibri, sans-serif;
  }
`;
