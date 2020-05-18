import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { ErrorIcon, Warning, Success, Info } from './Icons';
import { SET_NOTICE } from '../../store/types';
import store from '../../store';

const Notice = () => {
  const { state, dispatch } = useContext(store);
  if (!state.notice) return null;

  const {
    notice: { open, type, message },
  } = state;

  const hideNotice = () => {
    dispatch({
      type: SET_NOTICE,
      payload: { ...state.notice, open: false },
    });
  };

  const getIcon = () => {
    switch (type) {
      case 'error':
        return <ErrorIcon />;
      case 'success':
        return <Success />;
      case 'warning':
        return <Warning />;
      default:
        return <Info />;
    }
  };

  useEffect(() => {
    if (open) {
      const timeout = setTimeout(hideNotice, 10000);
      return () => clearTimeout(timeout);
    }
  }, [state.notice]);

  return (
    <Container className={type} onClick={hideNotice}>
      <Icon className={type}>{getIcon()}</Icon>
      <Text>{message}</Text>
    </Container>
  );
};

export default Notice;

/* Styles */

const Container = styled.div`
  position: absolute;
  width: 300px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  top: 80px;
  right: 10px;
  opacity: 1;
  transition: 0.3s ease-in-out;
  font-size: 12px;
  border-radius: 3px;
  -webkit-app-region: none;

  &.closed {
    opacity: 0;
  }

  &.error {
    color: rgb(250, 179, 174);
    background: rgb(24, 6, 5);
  }

  &.warning {
    color: rgb(255, 213, 153);
    background: rgb(25, 15, 0);
  }

  &.info {
    color: rgb(166, 213, 250);
    background: rgb(3, 14, 24);
  }

  &.success {
    color: rgb(183, 223, 185);
    background: rgb(7, 17, 7);
  }
`;

const Icon = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 10px;

  &.error {
    color: #f44336;
  }

  &.warning {
    color: #ff9800;
  }

  &.info {
    color: #2196f3;
  }

  &.success {
    color: #4caf50;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const Text = styled.div``;
