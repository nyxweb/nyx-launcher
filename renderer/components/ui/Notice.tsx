import { FC } from 'react';
import styled from 'styled-components';
import { ErrorIcon, Warning, Success, Info } from './Icons';

export interface INotice {
  open: boolean;
  type: 'error' | 'warning' | 'info' | 'success';
  message: string;
}

const Notice: FC<{ notice: INotice }> = ({
  notice: { open, type, message },
}) => {
  return (
    <Container className={`${type} ${open ? ' open' : ' closed'}`}>
      <Icon className={type}>
        {type === 'error' ? (
          <ErrorIcon />
        ) : type === 'success' ? (
          <Success />
        ) : type === 'warning' ? (
          <Warning />
        ) : (
          <Info />
        )}
      </Icon>
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

  &.closed {
    opacity: 0;
  }

  &.error {
    color: rgb(250, 179, 174);
    background-color: rgb(24, 6, 5);
  }

  &.warning {
    color: rgb(255, 213, 153);
    background-color: rgb(25, 15, 0);
  }

  &.info {
    color: rgb(166, 213, 250);
    background-color: rgb(3, 14, 24);
  }

  &.success {
    color: rgb(183, 223, 185);
    background-color: rgb(7, 17, 7);
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
