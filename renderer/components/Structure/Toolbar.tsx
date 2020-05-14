import styled from 'styled-components';
import Link from 'next/link';
import { Close, Minus as Minimize, SettingsSolid } from '../ui/Icons';
import { sendCmd } from '../../utils';
import { remote } from 'electron';

const Toolbar = () => {
  return (
    <Container>
      <Link href='/'>
        <MuIcon onClick={() => sendCmd('check-update')} />
      </Link>
      <Link href='/'>
        <Title>Nyx Launcher</Title>
      </Link>
      <Buttons>
        <IconWrapper
          onClick={() => remote.app.exit(0)}
          style={{ background: '#ff5750', color: '#aa0e0d' }}
        >
          <Close />
        </IconWrapper>
        <IconWrapper
          onClick={() => remote.BrowserWindow.getFocusedWindow()?.minimize()}
          style={{ background: '#ffbf2e', color: '#995700' }}
        >
          <Minimize />
        </IconWrapper>
        <Link href='/settings'>
          <IconWrapper style={{ background: '#2acf42', color: '#006500' }}>
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
    center/50%;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  opacity: 0.8;
  -webkit-app-region: none;

  &:hover {
    opacity: 1;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
  margin-left: 20px;
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

const IconWrapper = styled.div`
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.1s ease-in-out;
  background: rgba(255, 255, 255, 0.2);
  margin: 3px 0;
  -webkit-app-region: none;

  svg {
    width: 10px;
    height: 10px;
  }

  &:hover {
    color: white;
  }
`;
