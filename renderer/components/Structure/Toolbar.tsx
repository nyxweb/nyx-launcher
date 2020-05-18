import styled from 'styled-components';
import Link from 'next/link';
import { Close, Minus as Minimize, SettingsSolid } from '../ui/Icons';
import electron from 'electron';
import { useContext } from 'react';
import store from '../../store';

const Toolbar = () => {
  const { state } = useContext(store);

  const closeApp = () => {
    if (electron.remote) {
      electron.remote.app.exit(0);
    }
  };

  const minimuzeApp = () => {
    if (electron.remote) {
      electron.remote.BrowserWindow.getFocusedWindow()?.minimize();
    }
  };

  return (
    <Container>
      <Link href='/'>
        <MuIcon />
      </Link>
      <Link href='/'>
        <Title>
          {state.config!.name} is
          <Text color={state.server ? 'green' : 'red'}>
            {state.server ? 'Online' : 'Offline'}
          </Text>
        </Title>
      </Link>
      <Buttons>
        <IconWrapper background='#ff5750' color='#aa0e0d' onClick={closeApp}>
          <Close />
        </IconWrapper>
        <IconWrapper background='#ffbf2e' color='#995700' onClick={minimuzeApp}>
          <Minimize />
        </IconWrapper>
        <Link href='/settings'>
          <IconWrapper background='#2acf42' color='#006500'>
            <SettingsSolid />
          </IconWrapper>
        </Link>
      </Buttons>
    </Container>
  );
};

export default Toolbar;

/* Styles */

const Container = styled.div`
  position: relative;
  grid-area: toolbar;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-right: 10px;
  background: rgba(0, 0, 0, 0.45);

  svg {
    opacity: 0;
    transition: 0.1s ease-in-out;
  }

  &:hover {
    svg {
      opacity: 1;
    }
  }
`;

const MuIcon = styled.div`
  width: 70px;
  height: 70px;
  background: rgba(0, 0, 0, 0.3) url('/images/icon.png') no-repeat center
    center/75%;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  -webkit-app-region: none;

  &:hover {
    filter: brightness(1.1);
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
  margin-left: 10px;
  font-size: 20px;
  cursor: pointer;
  -webkit-app-region: none;
`;

const Buttons = styled.div`
  position: absolute;
  right: 7px;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const IconWrapper = styled.div<{ background?: string; color?: string }>`
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.1s ease-in-out;
  background: ${(p) => p.background || 'transparent'};
  color: ${(p) => p.color || 'white'};
  margin: 3px 0;
  -webkit-app-region: none;

  svg {
    width: 10px;
    height: 10px;
  }
`;

const Text = styled.span<{ color?: string }>`
  color: ${(p) => (p.color ? p.color : 'inherit')};
  margin-left: 5px;
`;
