import { useContext } from 'react';
import styled from 'styled-components';
import { ErrorIcon, Warning, Success, Info } from './Icons';
import { REMOVE_NOTICE } from '../../store/types';
import store from '../../store';

const Notice = () => {
  const { state, dispatch } = useContext(store);

  const getIcon = (type: string) => {
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

  const removeNotice = (id: string) => {
    dispatch({
      type: REMOVE_NOTICE,
      payload: id,
    });
  };

  return (
    <Container>
      {state.notices.map(({ id, type, message }) => (
        <NoticeItem key={id} className={type} onClick={() => removeNotice(id)}>
          <Icon className={type}>{getIcon(type)}</Icon>
          <Text>{message}</Text>
        </NoticeItem>
      ))}
    </Container>
  );
};

export default Notice;

/* Styles */

const Container = styled.div`
  position: absolute;
  top: 75px;
  right: 5px;
  display: grid;
  grid-gap: 10px;
  width: 320px;
`;

const NoticeItem = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 12px;
  border-radius: 3px;
  -webkit-app-region: none;

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
